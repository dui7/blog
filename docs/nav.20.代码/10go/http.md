# Http Demo

```go
package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
)

func jsonHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != "POST" {
		http.Error(w, "/login only support POST method", http.StatusBadRequest)
		return
	}

	fmt.Println("receive data")

	w.Header().Set("content-type", "text/json")
	data := getData()
	retJson, _ := json.Marshal(data)

	io.WriteString(w, string(retJson))

	return
}

func getData() map[string]interface{} {
	data := `{
	  "requestTime": 1618044435664,
	  "responseId": "1a9a05c0-457b-416c-ba52-cb6cf99ad001",
	  "responseTime": 1618044435672,
	  "code": 0,
	  "data": 
		{
		  "nickName": "admin",
		  "sessionId": "11111111",
		  "token": "2FoYE33AuZETV8kNGg7mmrCKXUZefVlA",
		  "user_id": "1"
		}
	}`

	var m map[string]interface{}
	if err := json.Unmarshal([]byte(data), &m); err != nil {
		panic(err)
	}

	return m
}

func main() {
	// JSON handler
	http.HandleFunc("/login", jsonHandler)
	fmt.Printf("Starting server for testing HTTP POST...\n")
	if err := http.ListenAndServe(":8899", nil); err != nil {
		log.Fatal(err)
	}
	
}

```
