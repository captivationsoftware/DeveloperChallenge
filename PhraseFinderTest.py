'''
Created on Sep 1, 2020

@author: matth
'''

import io
import sys
import PhraseFinder

# Run test 1
test1in = "0101" + PhraseFinder.CAPTION + "01"*75
test1out = io.StringIO()

s = io.StringIO(test1in)
sys.stdin = s
old_stdout = sys.stdout
sys.stdout = test1out

PhraseFinder.run()

sys.stdout = old_stdout

if not "01"*50 == test1out.getvalue():
    print("Test 1 FAILURE")
else:
    print("Test 1 success")

# Run test 2
test2in = "01"*500
test2out = io.StringIO()
s = io.StringIO(test2in)
sys.stdin = s
old_stdout = sys.stdout
sys.stdout = test2out


PhraseFinder.run()

sys.stdout = old_stdout

if len(test2out.getvalue()) > 0:
    print("Test 2 FAILURE")
else:
    print("Test 2 success")

# Run test 3
test3in = "0101" + PhraseFinder.CAPTION + "0101" + PhraseFinder.CAPTION + "01"*75
test3out = io.StringIO()

s = io.StringIO(test3in)
sys.stdin = s
old_stdout = sys.stdout
sys.stdout = test3out

PhraseFinder.run()

sys.stdout = old_stdout

if not ("0101" + PhraseFinder.CAPTION + "01"*50) == test3out.getvalue():
    print("Test 3 FAILURE")
else:
    print("Test 3 success")

# Run test 4
test4in = "01010" + PhraseFinder.CAPTION + "010100" + PhraseFinder.CAPTION + "01"*75 + PhraseFinder.CAPTION + "00"*99
test4out = io.StringIO()

s = io.StringIO(test4in)
sys.stdin = s
old_stdout = sys.stdout
sys.stdout = test4out

PhraseFinder.run()

sys.stdout = old_stdout

if not ("010100" + PhraseFinder.CAPTION + "01"*50 + "00"*50) == test4out.getvalue():
    print("Test 4 FAILURE")
else:
    print("Test 4 success")

