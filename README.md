# Regex_Turing_Machine
Literally taken concept of Turing Machine, turned into reality.

# Formatting Rules:
    Rules are stored as an Array in which every element is an Object, like this:
```javascript
    [
        {
            state: "a",                 <- String
            onTape: [
                {
                    currentValue: 0,    <- Fixed value, do not change
                    replace: "1",       <- String
                    newState: "b",      <- String
                    goTo: "r"           <- String
                },
                {
                    currentValue: 1,    <- Fixed value, do not change
                    replace: "0",       <- String
                    newState: "c",      <- String
                    goTo: "r"           <- String
                }
            ]
        },
    ]
```
Where:
 - `state`: Specifies to which state rule applies.
 - `onTape`: Has 2 options, for 0 and 1.
 - `currentValue`: SHOULD NOT be changed, but if you will, it will probably break.
 - `replace`: Value in brackets will be replaced with this.
 - `newState`: State to which machine will be changed.
 - `goTo`: The direction in which the TAPE will go. Has 3 possibilities: `"r"` for Right, `"l"` for Left or `"H"` for HALTING.
        
States should be kept as short as possible, preferably one letter.
It is advised however, to write more than one rule.
