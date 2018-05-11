import os
import subprocess
import sys
import time

with open('temp', 'w') as tempfile:
    with open(sys.argv[1]) as infile:
        for line in infile.readlines():
            for c in line:
                # for every 'z', try to throw off the 8-bit sequence
                if c == 'z':
                    tempfile.write('1010')
                binstr = format(ord(c), '08b')
                tempfile.write(binstr)

with open('temp') as tempfile:
    p = subprocess.Popen(['python', 'csdc.py'], stdin=tempfile)

time.sleep(2)
os.remove('temp')
p.terminate()
print 'done'
