/***
 * In between line whitespace does not let some things compile.
 */
//commit
const len = (a) => a.length;
const UID = () => '_' + Math.random().toString(36).substr(2, 9);

var index = 'ikjhnhnbubuyhbuy',
    ends = '';

function initWeb() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            index = JSON.parse(this.responseText);
        }
    };
    xhttp.open("GET", "https://erkus-circus.github.io/Canvas-Language/assemblecoms.json", true);
    xhttp.send();
}

function parseAsm(line, lnum) {
    line = line.replace(/\s/, '');


    var commaseps = line.split(','),
        compiledLine = '';

    for (let i = 0; i < commaseps.length; i++) {
        commaseps[i] = commaseps[i].replace(/\s/, '');
    }

    for (const cmd in index.cmds) {


        if (commaseps[0] == cmd) {
            // if speacial cmds
            if (commaseps[0] == '_end') {
                compiledLine += ends;
            }

            // for every cmd, add compiled js
            var com = index.cmds[cmd];
            compiledLine += com.compile;
            if (com.pre_end) {
                ends += com.pre_end;
            }

            for (let i = 1; i < commaseps.length; i++) {
                const arg = commaseps[i];
                compiledLine = compiledLine.replace('$' + (i - 1), arg);

                ends = ends.replace('$' + (i - 1), arg);
            }


            return compiledLine + '\n';
        }
    }

    return "";
}


function assemble(dat) {
    var compiled = ""
    var lines = dat.split(';');
    for (let i = 0; i < len(lines); i++) {
        var l = lines[i];
        if (l.replace(/\s/, '') == "") {
            continue;
        }
        compiled += parseAsm(l);
    }
    return compiled;
}
