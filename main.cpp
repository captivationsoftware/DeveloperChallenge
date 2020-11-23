#include <array>
#include <bitset>
#include <iostream>
#include <sstream>
#include <string>
#include <stdexcept>

constexpr int kBufferSize = 16; // Must be bigger than or equal to 16.
constexpr int kNumberOfMessageCharacters = 100; 

/// @return The char encoded by '1''s and '0''s in the buffers.
/// @note The buffer is broken into two parts in order to continually stream from cin.
char extractChar(
  const std::array< char, kBufferSize >& buffer1,
  const std::array< char, kBufferSize >& buffer2,
  int startPosition )
{

#ifndef NDEBUG  
  if ( startPosition + 8 >= kBufferSize * 2 ) {
    std::ostringstream errorMessageBuilder;
    errorMessageBuilder << "Invalid startPosition " << startPosition << " it must be less than " << kBufferSize * 2 - 8
                        << std::endl;
    throw std::invalid_argument( errorMessageBuilder.str() );
  }
#endif
  std::bitset< 8 > charBitSet;
  for ( int i = 0; i < 8; ++i ) {
    const int globalPosition = i + startPosition;
    if ( globalPosition >= kBufferSize && buffer2[ globalPosition - kBufferSize ] == '1' ) {
      charBitSet.set( i );
    } else if ( buffer1[ globalPosition ] == '1' ) {
      charBitSet.set( i );
    }
  }

  // Can we do this without the ulong temporary?
  return static_cast< char >( charBitSet.to_ulong() );
}

/// Responsible for determining when the preamble is found
class PreambleFinder
{
public:
  PreambleFinder( std::string preamble ) : mPreamble( std::move( preamble ) )
  {}

  // @return true if the next character is part of the preamble sequence, else false
  bool checkForNextCharacter(
    const std::array< char, kBufferSize >& frontBuffer,
    const std::array< char, kBufferSize >& backBuffer,
    int pos )
  {
    if ( extractChar( frontBuffer, backBuffer, pos ) == mPreamble[ mTrackingPosition ] ) {
      ++mTrackingPosition;
      return true;
    }
    reset();
    return false;
  }

  /// @return true if the entire preamble has been found in the bit stream
  bool found() const
  {
    return mTrackingPosition == mPreamble.size();
  }

  void reset()
  {
    mTrackingPosition = 0;
  }

private:
  std::string mPreamble;
  int mTrackingPosition = 0; // Relative to preamble pos
};

void fillBufferFromCin( std::array< char, kBufferSize >& ioBuffer )
{
  for ( int i = 0; i < kBufferSize ; ++i ) {    
    std::cin.get( ioBuffer[i] );
  }
}

int main()
{
  // We use two buffers to get continuous input.  Once we've read all the 'bits' from
  // the front buffer, the back buffer becomes the front buffer and we read a new back buffer  
  std::array< char, kBufferSize > buffer1;
  std::array< char, kBufferSize > buffer2;
  
  PreambleFinder finder( "CAPTIVATION" );
  int messagePos = 0; // Used to determine when the 100 character message is fully populated
  char messageBuffer[ kNumberOfMessageCharacters + 1 ]; // +1 for streaming properly via null termination
  messageBuffer[ kNumberOfMessageCharacters ] = 0; // Do the null termination

  int bufferPos = 0; // We process the buffers in place and keep track of where we are with this.
  
  // These pointers will be used to flip flop the actual buffers when needed
  std::array< char, kBufferSize >* frontBuffer = &buffer1;
  std::array< char, kBufferSize >* backBuffer = &buffer2;
  std::array< char, kBufferSize >* goBetweenBuffer = nullptr;
  
  fillBufferFromCin( *frontBuffer ); // Prime the pump
  
  // In production I would expect a termination message at some point, for now
  // we'll rely on the user / testing framework to terminate the application.
  while ( true ) {
    fillBufferFromCin( *backBuffer );
    
    // Once we get past 7 bits we no longer combine with the front buffer to make a char, so flip-flop
    while ( bufferPos < kBufferSize + 7 ) {
      if ( !finder.found() ) {
        if ( finder.checkForNextCharacter( *frontBuffer, *backBuffer, bufferPos ) ) {
          // Jump to the next character
          bufferPos += 8; 
          // Note: There is an edge case here for preambles that don't start with C
          // If the random bits before the first letter of the preamble form to make 
          // the first letter, then we would jump past the actual start of the first letter
          // i.e. If the first letter were A [01000001], but the random bits before the letter
          // were e.x. 010000, forming 010000[01000001], then the random A would force the 
          // bufferPos past the beginning of the real A, and we would lose the message 
          // Luckily 'C' is 01000011, there are no random bits that could combine with the 
          // first part of its binary representation to form a random C.  Since the spec
          // is for C, I'm not going to add the complexity needed to handle this edge case 
          // because YAGNI.
        } else {
          ++bufferPos;
        }
      } else { // Finder found, build the message
        messageBuffer[ messagePos++ ] = extractChar( *frontBuffer, *backBuffer, bufferPos );
        if ( messagePos >= kNumberOfMessageCharacters ) {
          // The instructions say "Nothing else should be printed to cout"
          // I'm taking that literally and not flushing with endl (no \n);
          std::cout << messageBuffer << std::flush;
          messagePos = 0;
          finder.reset();
        }
        bufferPos += 8;
      }
    }
    
    // Flip-flop the buffers
    goBetweenBuffer = frontBuffer;
    frontBuffer = backBuffer;
    backBuffer = goBetweenBuffer;
    
    // Keep the same relative position as the back buffer becomes the front
    bufferPos -= kBufferSize;
  }

  return 0;
}