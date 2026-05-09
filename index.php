<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
    <link rel="stylesheet" href="styles.css ">
</head>

<body>
    <header>
        <h1>alunos faculdade</h1>
    </header>

    <main>
        <div id="container_selects">
            <div>
                <label for="ordenar">ordenar por:</label>
                <select name="ordenar" id="ordenar">
                    <option value=""></option>
                    <option value="nome">nome | a - z</option>
                    <option value="nome_inverso">nome | z - a</option>
                    <option value="data_nascimento">data de nascimento | velho - novo</option>
                    <option value="data_nascimento_inverso">data de nascimento | novo - velho</option>
                    <option value="data_matricula">data matrícula | velho - novo</option>
                    <option value="data_matricula_inverso">data matrícula | novo - velho</option>
                    <option value="semestre_inverso">semestre | maior - menor</option>
                    <option value="semestre">semestre | menor - maior</option>
                </select>

            </div>
            <div>
                <label for="ano_nascimento">ano de nascimento:</label>
                <select name="ano_nascimento" id="ano_nascimento">
                </select>
            </div>
            <div>
                <label for="ano_matricula">ano de matrícula:</label>
                <select name="ano_matricula" id="ano_matricula">
                </select>
            </div>
            <div>
                <label for="curso:">curso</label>
                <select name="curso" id="curso">
                </select>
            </div>
            <div>
                <label for="semestre">semestre:</label>
                <select name="semestre" id="semestre">
                </select>
            </div>
            <div>
                <label for="periodo">periodo:</label>
                <select name="periodo" id="periodo">
                </select>
            </div>
        </div>
        <div id="container-query">
            <label for="consulta">QUERY SQL:</label>

            <div>
                <input type="text" name="sql" id="consulta" id="btn-consulta">

                <button id="consulta-btn">consultar</button>
                <button id="limpar-consulta-btn">limpar</button>
            </div>
        </div>
        <div id="container_tabela">
            <table id="tabela_dados">
                <thead>

                </thead>
                <tbody></tbody>
            </table>
            <div id="container-button">

            </div>
        </div>
    </main>
    <footer>
        <a href="https://github.com/kauan-araujo-dev" aria-label="Github"><i class="fab fa-github"></i>kauan-araujo-dev</a>
    </footer>
    <script src="script.js"></script>
</body>

</html>