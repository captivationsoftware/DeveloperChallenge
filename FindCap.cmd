@ECHO Off

pushd
set jar=CaptivationDeveloperChallenge-1.0-SNAPSHOT.jar
pwd
if NOT exist target\%jar% ( mvn clean install )

set dialog="about:<Title>Tom</Title><input type=file id=FILE><script>FILE.click();new ActiveXObject
set dialog=%dialog%('Scripting.FileSystemObject').GetStandardStream(1).WriteLine(FILE.value);
set dialog=%dialog%close();resizeTo(0,0);</script>"

for /f "tokens=* delims=" %%p in ('mshta.exe %dialog%') do set "base=%%p"
echo selected  file is : "%file%"

java -jar target\%jar% <"%jar%"


popd
