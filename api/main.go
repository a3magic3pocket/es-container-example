package main

import (
	"io"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func handleNow(c *gin.Context) {
	now := time.Now()
	c.JSON(http.StatusOK, gin.H{"data": now})
}

func main() {
	// Set file logging
	gin.DisableConsoleColor()

	logFilePath := "gin.log"
	var f *os.File
	var fileError error
	if _, err := os.Stat(logFilePath); os.IsNotExist(err) {
		f, fileError = os.Create(logFilePath)
	} else {
		f, fileError = os.OpenFile(logFilePath, os.O_APPEND, os.FileMode(0644))
	}
	if fileError != nil {
		log.Fatal(fileError)
	}
	defer f.Close()

	gin.DefaultWriter = io.MultiWriter(f)

	// Set gin mode
	gin.SetMode(gin.ReleaseMode)

	// Set router
	router := gin.Default()
	corsConf := cors.New(cors.Config{
		AllowOrigins: []string{"http://localhost:8000"},
	})
	router.Use(corsConf)

	router.GET("/now", handleNow)

	router.Run(":8080")
}
