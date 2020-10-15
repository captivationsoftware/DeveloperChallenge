cc=g++
objects=main.o BitStreamProcessor.o 
cflags=-Wall -fPIE
INCLUDE=-I include/

all: ${objects}
	${cc} ${cflags} ${objects} -o main.out ${INCLUDE} -fPIE

BitStreamProcessor.o: ./src/BitStreamProcessor.cpp ./include/BitStreamProcessor.h
	${cc} ${cflags} -c ./src/BitStreamProcessor.cpp ${INCLUDE}

main.o: main.cpp
	${cc} ${cflags} -c ./main.cpp ${INCLUDE}

install: clean all run

test: clean all run_test

run_test: main.out
	./test.sh

run: main.out
	./main.out

valgrind: main.out
	valgrind --leak-check=full ./test.sh

clean:
	rm -rf *.o
	rm -f *.out
	rm -f *~ *.h.gch *#
