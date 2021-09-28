package ascii

import (
	"bufio"
	"fmt"
	"io"
	"net/http"
	"strings"
)

func check(e error) {
	if e != nil {
		panic(e)
	}
}

func Art(input string, template string, w http.ResponseWriter) {
	lines, err := UrlToLines("https://git.01.kood.tech/root/public/raw/branch/master/subjects/ascii-art/" + template + ".txt")
	check(err)

	arr := strings.Split(input, "\n")

	for _, e := range arr {
		for i := 0; i < 8; i++ {
			printS := ""
			r := []rune(e)
			for _, runeR := range r {
				printS += lines[int(runeR-32)*9+1+i]
			}
			if printS != "" {
				fmt.Fprintln(w, printS)
			}
		}
		fmt.Fprintln(w)
	}
}

func UrlToLines(url string) ([]string, error) {
	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	return LinesFromReader(resp.Body)
}

func LinesFromReader(r io.Reader) ([]string, error) {
	var lines []string
	scanner := bufio.NewScanner(r)
	for scanner.Scan() {
		lines = append(lines, scanner.Text())
	}
	if err := scanner.Err(); err != nil {
		return nil, err
	}

	return lines, nil
}
