# Solution

Run the application - the program will wait for input on stdin
```
python csdc.py
```

Running the test program with a 'normal' text file as input
```
python test_csdc.py <file>
python test_csdc.py input/4.txt
```

Running the ascii-generator
```
docker run -i captivation/ascii-generator | python csdc.py
```
