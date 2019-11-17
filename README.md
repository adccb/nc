# nc

this is a WIP CLI app to send data to [nomie](https://nomie.app/).

## usage

all you need to bring to nomie is your config file. we've included a stub in `/src/config.example.json` you can follow. (you should rename that file to `config.json your config file needs two things.

- `apiKey` (string): this can be found in nomie's [api settings](https://open.nomie.app/api) page.
- your tracker `options` (string[][]): an array of arrays of strings. example:

```
[
  // cli flag, nomie tracker name, range of values
  ["m", "#mood", "1..5"],
  ["e", "#energy", "1..10"],
]
```

with the above options, you can call 

```
$ nc -m 1 -e 8
```

which will hydrate into `#mood(1), #energy(8)`.

you'll be given an opportunity to make sure your data is correct. here's a typical `nc` run:

```
λ nc -m 1 -e 2

here's what we heard.
	#mood	1
	#energy	2

should we log this to nomie? Y/n
y
```

## interactive mode
calling  `nc -i`  starts "interactive mode"; we'll step through all your options one-by-one and ask you for your response; then we'll scoop up all that data. here's an example run in interactive mode:

```
λ nc -i

starting interviewer...

how is your #mood? 1
how is your #energy? 2

here's what we heard.
	#mood	1
	#energy	2

should we log this to nomie? Y/n
y
```