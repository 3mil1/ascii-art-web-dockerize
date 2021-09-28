package server

import (
	ascii "back-end/ascii"
	"encoding/json"
	"fmt"
	"net/http"
)

type ASCII struct {
	Input  string `json:"input"`
	Banner string `json:"banner"`
}

func greet(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello")
}

func handlePostJson(w http.ResponseWriter, r *http.Request) {
	var a ASCII

	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
	w.Header().Set("Access-Control-Allow-Methods", "GET, OPTIONS, POST, PUT")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}

	err := json.NewDecoder(r.Body).Decode(&a)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	ascii.Art(a.Input, a.Banner, w)
}

