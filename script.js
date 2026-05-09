
const consultaBtn = document.querySelector("#consulta-btn");
const limparConsultaBtn = document.querySelector("#limpar-consulta-btn");
const table = document.querySelector("tbody");
const containerButton = document.querySelector("#container-button");
let limite = 10;
let numeroAlunos = 0;
const selecionado = false;

numeroDeAlunos().then(total => {
    numeroAlunos = total;
    gerarSelects();
    buscarAlunos();
});

/**Buscar Informações */
async function buscarAlunos() {
    const response = await fetch("buscarAluno.php?limite=" + limite + "&&nAlunos=" + numeroAlunos);
    const data = await response.json();
    gerarTr({ dado: "dado" }, true);
    let row = "";
    console.log(typeof data);
    for (let element of Object.values(data)) {
        row += "<tr>";
        for (let chave in element) {
            row += "<td>" + element[chave] + "</td>";
        }
        row += "</tr>";
    }
    table.innerHTML += row;

    botaoExibirMais();


}


async function buscarAlunoSQL(sql) {
    const response = await fetch("buscarAluno.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `sql=${sql}`
    });
    const data = await response.json();

    table.innerHTML = "";
    containerButton.innerHTML = "";

    setTimeout(function () {
        if (data.length == 0 || data == "" || data == null || data == undefined) {
            gerarTr({ dado: "dado" }, true);
        } else {
            gerarTr(data[0]);
            let row = "";
            for (let element of data) {
                row += "<tr>";
                for (let chave in element) {
                    row += "<td>" + element[chave] + "</td>";
                }
                row += "</tr>";
            }
            table.innerHTML = row;
        }
    }, 500)


}




/** Filtros - Selects*/

//Scanner dos selects
function filtros(selects) {
    let sql = "";

    selects.forEach((element) => {
        element.addEventListener("change", () => {
            let indexWhere = 0;
            sql = "SELECT * FROM alunos WHERE ";
            selects.forEach((elemento) => {
                const name = elemento.getAttribute('name');
                const valor = elemento.value;
                if (valor.trim() != "") {

                    if (indexWhere <= 0 && name == 'ordenar') {

                        sql = "SELECT * FROM alunos " + valorSQL(name, valor);
                    } else if (indexWhere <= 0) {

                        sql += valorSQL(name, valor);
                        indexWhere++;
                    } else {

                        if (name != 'ordenar') {
                            sql += " AND ";
                        }
                        sql += valorSQL(name, valor);
                        indexWhere++;
                    }
                }
            });

            const input = document.querySelector("#container-query input");
            input.value = "";
            buscarAlunoSQL(sql);
        });
    })
}

// Gerar valor da query
function valorSQL(selectName, optionValue) {
    switch (selectName) {
        case "ordenar":
            let order = " ORDER BY ";

            if (optionValue.includes("nome")) {
                order += "nome";
            }
            if (optionValue.includes("data_nascimento")) {
                order += "data_nascimento";
            }
            if (optionValue.includes("data_matricula")) {
                order += "data_matricula";
            }
            if (optionValue.includes("semestre")) {
                order += "semestre";
            }

            if (optionValue.includes("inverso")) {
                order += " DESC";
            }
            return order;
            break;
        case "ano_nascimento":
            return `YEAR(data_nascimento) = ${optionValue}`;
            break;
        case "ano_matricula":
            return `YEAR(data_matricula) = ${optionValue}`;
            break;
        case "curso":
            return `curso = '${optionValue}'`;
            break;
        case "semestre":
            return `semestre = ${optionValue}`;
            break;
        case "periodo":
            return `periodo = '${optionValue}'`;
            break;
    }
    return "";
}
//Gerar os selects
async function gerarSelects() {
    const response = await fetch("buscarAluno.php?selects");
    const data = await response.json();


    const selectOrdenar = document.querySelector('#ordenar');
    const selectAnoNascimento = document.querySelector('#ano_nascimento');
    const selectAnoMatricula = document.querySelector('#ano_matricula');
    const selectCurso = document.querySelector('#curso');
    const selectSemestre = document.querySelector('#semestre');
    const selectPeriodo = document.querySelector('#periodo');

    const selects = [selectAnoNascimento, selectAnoMatricula, selectCurso, selectSemestre, selectPeriodo];

    for (let i = 0; i < data.length; i++) {
        selects[i].innerHTML = "";
        let head = "<option value=''></option>";
        for (let elemento of data[i]) {
            for (let chave in elemento) {
                head += `<option value='${elemento[chave]}'>${elemento[chave]}</option>`;

            }
        }
        selects[i].innerHTML = head;


    }

    selects.push(selectOrdenar);
    filtros(selects);
}

/* Botões e eventos de botoes */

//Botão exibir mais
function botaoExibirMais() {
    botao = document.createElement("button");
    botao.textContent = "Exibir mais";
    numerosLinhas = numeroLinhas();

    if (numerosLinhas >= numeroAlunos) {
        console.log(numeroAlunos)
        containerButton.innerHTML = "";
    } else {
        if (containerButton.innerHTML.trim() === "") {
            containerButton.appendChild(botao);
            botao.addEventListener('click', () => {
                limite += 10;
                buscarAlunos();
            });
        }

    }
}

//Evento botão consultar
consultaBtn.addEventListener("click", () => {
    let inputSQL = document.querySelector("#consulta");
    inputSQL = inputSQL.value;
    inputSQL = inputSQL.toLowerCase();
    if (inputSQL.includes("delete") || inputSQL.includes("update") || inputSQL.includes("insert")) {
        inputSQL = "";
    } else
        if (inputSQL != "") {
            containerButton.innerHTML = "";
            table.innerHTML = "";
            buscarAlunoSQL(inputSQL);
        } else {
            containerButton.innerHTML = "";
            table.innerHTML = "";
            gerarTr({ dado: "dado" }, true);
        }
    const selects = document.querySelectorAll("select");
    selects.forEach((elemento) => {
        elemento.selectedIndex = 0;
    })

});

//Evento botão limpar
limparConsultaBtn.addEventListener("click", () => {
    let inputSQL = document.querySelector("#consulta");
    inputSQL.value = "";
    limite = 10;
    table.innerHTML = "";
    const selects = document.querySelectorAll("select");
    setTimeout(function () {
        selects.forEach((elemento) => {
            elemento.selectedIndex = 0;
        });
        buscarAlunos();
    }, 300);

});

/* Gerar HTML */

//Gerador dos titulos das tabelas
function gerarTr(dados, padrao = false) {
    const thead = document.querySelector("thead");
    let head = "";
    head = "<tr>";

    for (let chave in dados) {
        let jaExibido = true;
        if (chave == "id" || padrao) {
            head += "<th>id</th>";
            jaExibido = false;
        }
        if (chave == "nome" || padrao) {
            head += "<th>nome</th>";
            jaExibido = false;
        }
        if (chave == "data_nascimento" || padrao) {
            head += "<th>data nascimento</th>";
            jaExibido = false;
        }
        if (chave == "data_matricula" || padrao) {
            head += "<th>data matrícula</th>";
            jaExibido = false;
        }
        if (chave == "curso" || padrao) {
            head += "<th>curso</th>";
            jaExibido = false;
        }
        if (chave == "semestre" || padrao) {
            head += "<th>semestre</th>";
            jaExibido = false;
        }
        if (chave == "periodo" || padrao) {
            head += "<th>período</th>";
            jaExibido = false;
        }
        if (chave != "dado" && jaExibido) {
            head += "<th>" + chave + "</th>";
        }

    }
    head += "</tr>";
    thead.innerHTML = head;
}

// Contadores 

// Busca o número de Alunos
async function numeroDeAlunos() {
    const response = await fetch("buscarAluno.php?count");
    const data = await response.json();
    numeroAlunos = data;
    return data;
}

//Busca o número de linhas
function numeroLinhas() {
    let numerosLinhas = document.querySelectorAll('tbody > tr').length;
    return numerosLinhas;
}