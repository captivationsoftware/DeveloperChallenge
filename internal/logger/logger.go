package logger

import "log"

// LogWrapper wraps the standard library log function and prints logs only when debug mode = true
type LogWrapper struct {
	DebugMode bool
}

// Printf wraps the standard library log.Printf function but only prints if debug mode = true
func (l *LogWrapper) Printf(format string, v ...interface{}) {
	if l.DebugMode {
		log.Printf(format, v...)
	}
}
