SOURCE=Widgets
DESTINATION=wwwroot/static/CoreNode/Widgets
TRANSPILER=Transpiler/CNT.exe

all:TRANSPILER
	$(TRANSPILER) $(SOURCE) $(DESTINATION)