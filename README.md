# random-labels

Randomize a list of labels and display them in a suspenseful way

## Install

To install random-labels run this command:

```bash
npm install -g @clevercloud/random-labels
```

## Run

To run this command random-labels:

```bash
random-labels tutu toto titi
```

This will display the labels in a random order:

``` 
tutu => titi => toto
```

If you want to automatically copy the random list in your clipboard, you can use:

```bash
random-labels tutu toto titi --clipboard
```

This will copy the list as Markdown like this:

```markdown
- tutu
- titi
- toto
```
