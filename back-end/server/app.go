package server

import (
	"fmt"
	"log"
	"net/http"
)

const port = "8080"

func Start() {

	mux := http.NewServeMux()

	//define routes
	mux.HandleFunc("/greet", greet)
	//mux.HandleFunc("/customers", getAllCustomers)
	mux.HandleFunc("/post", handlePostJson)

	fmt.Printf("Starting server at http://localhost:" + port + "\n")

	//starting server
	log.Fatal(http.ListenAndServe("localhost:"+port, mux))
}
