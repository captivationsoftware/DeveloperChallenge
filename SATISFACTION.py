import sys,select,tty,termios
from queue import LifoQueue

#Getter method for preamble.
def preamble():
    return "0100001101000001010100000101010001001001010101100100000101010100"+\
        "010010010100111101001110"

#Makes a system call to pull data from stdin.
def isData():
    return select.select([sys.stdin], [], [], 0) == ([sys.stdin], [], [])

#Takes in a string of 0's and 1's, converts it to an integer of base-2 and converts that
#back into an ASCII string.
def decode(msg):
    tmpBuff = int(("0b"+msg),2)
    return tmpBuff.to_bytes((tmpBuff.bit_length() + 7) // 8, 'big').decode()

#Recursive function.
def getMsg(base,stack):
    #I originally had just a message variable but realized that unless we were in
    #a message, there was a potential of reading in variable length garbage input.
    #Rather than try to track noise coming in, I created a buffer that I use in the
    #base case, and then a message that I use in recursive calls.
    buf = ""
    msg = ""
    #This is the main read loop of the program.
    while 1:
        #To preserve order, I used a stack. However, to perfectly preserve order, you
        #would need to process all messages and return to the base case to print. In
        #certain applications, that might be fine, but in high-speed, high-output environments
        #you might never return to your base case.

        #As such, I implemented a max stack size of 10 and I print them out when the stack is 
        #full. For these 10 messages, order is preserved. Beyond that, there is no guarantee of
        #total order preservation. This is something that would be parameterized, provided user
        #requirements indicated it was necessary or the client requests it.

        #Additionally, I told it to print out if the stack is full OR if we are in the base. This
        #guarantees that if we are at the end of a stream, have processed all our messages, and don't
        #have a full stack, the remaining N messages are printed.
        if stack.full() or base:
            while not stack.empty():
                print(decode(stack.get()), file = sys.stdout, end = "")
                sys.stdout.flush()
                sys.stdin.flush()
        if isData():
            if base: buf += sys.stdin.read(1)
            else: msg += sys.stdin.read(1)

            if preamble() in msg:
               msg = msg[:-88]
               getMsg(False,stack)
            elif preamble() in buf:
               buf = buf[:-88]
               getMsg(False,stack)
            elif len(msg) == 800:
               stack.put(msg)
               break
            elif len(buf) == 176:
               buf = ""

#By default, reading from stdin is a blocking procedure. Rather than require
#the start of this program in unblock mode or something exotic, let's just hijack
#the terminal and make it interactive. We save the old settings and restore them
#when necessary.
def unblockStdIn():
    stackSize = 10
    old_settings = termios.tcgetattr(sys.stdin)
    try:
        tty.setcbreak(sys.stdin.fileno())
        #Our message stack.
        stack = LifoQueue(maxsize=stackSize)
        #Find the first preamble. The "True" argument is to specify this as the base
        #case. I wanted a totally recursive solution, and to avoid a helper method required
        #being able to know when you're in the base case because of the potential
        #for reading in invalid input until we get to a valid message.

        #Though having a helper might be useful to avoid needless buffer variables being allocated
        #when we're actually inside a valid message. I implemented both to see, but here only use the
        #completely recursive solution. I would welcome feedback on making this solution more
        #efficient. Python doesn't use tail recursion, or I would have tried to take advantage of
        #that.
        getMsg(True,stack)
    finally:
        termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)

#Arbitrary limit, would need to be set if there were 10**6 nested messages
sys.setrecursionlimit(10**6)
#Execution of program.
unblockStdIn()
