<?php
require_once("Conexao.php");

$conexao = Conexao::getConexao();

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    if (!empty($_GET['limite'])) {
        $limite = $_GET['limite'];



        $sql = "SELECT * FROM alunos LIMIT :limite";

        $consulta = $conexao->prepare($sql);

        $consulta->bindValue(':limite', $limite, PDO::PARAM_INT);

        $consulta->execute();

        $alunos = $consulta->fetchAll() ?: null;
        for ($i = 0; $i < $limite - 10; $i++) {
            unset($alunos[$i]);
        }
        if ($limite > $_GET['nAlunos']) {
            $limite = $_GET['nAlunos'];
        } else {
            for ($i = $limite; $i < count($alunos); $i++) {
                unset($alunos[$i]);
            }
        }
        
        echo json_encode($alunos);
    } elseif (isset($_GET['selects'])) {
        $sql = "SELECT DISTINCT YEAR(data_nascimento) FROM alunos ORDER BY data_nascimento";

        $consulta = $conexao->prepare($sql);

        $consulta->execute();

        $select = $consulta->fetchAll() ?: null;

        $data[0] = $select;


        $sql = "SELECT DISTINCT YEAR(data_matricula) FROM alunos ORDER BY data_matricula";

        $consulta = $conexao->prepare($sql);

        $consulta->execute();

        $select = $consulta->fetchAll() ?: null;

        $data[1] = $select;


        $sql = "SELECT DISTINCT curso FROM alunos";

        $consulta = $conexao->prepare($sql);

        $consulta->execute();

        $select = $consulta->fetchAll() ?: null;

        $data[2] = $select;



        $sql = "SELECT DISTINCT semestre FROM alunos ORDER BY semestre";

        $consulta = $conexao->prepare($sql);

        $consulta->execute();

        $select = $consulta->fetchAll() ?: null;

        $data[3] = $select;


        $sql = "SELECT DISTINCT periodo FROM alunos";

        $consulta = $conexao->prepare($sql);

        $consulta->execute();

        $select = $consulta->fetchAll() ?: null;

        $data[4] = $select;


        echo json_encode($data);

    } elseif (isset($_GET['count'])) {
        $sql = "SELECT COUNT(id) FROM alunos";

        $consulta = $conexao->prepare($sql);

        $consulta->execute();

        $numeroAlunos = $consulta->fetch();

        echo json_encode($numeroAlunos['COUNT(id)']);
    }
} else if ($method == 'POST') {
    try {
        $sql = $_POST['sql'];

        if (str_contains(strtolower($sql), "delete") || str_contains(strtolower($sql), "update") || str_contains(strtolower($sql), "insert")) {
            echo json_encode([]);
        } else {
            if (str_contains(strtolower($sql), "select")) {
                $consulta = $conexao->prepare($sql);

                $consulta->execute();

                $alunos = $consulta->fetchAll() ?: null;
                for ($i = 0; $i < count($alunos); $i++) {
                    if (!empty($alunos[$i]['data_matricula'])) {
                        $alunos[$i]['data_matricula'] = (new DateTime($alunos[$i]['data_matricula']))->format("d/m/Y");
                    }
                    if (!empty($alunos[$i]['data_nascimento'])) {
                        $alunos[$i]['data_nascimento'] = (new DateTime($alunos[$i]['data_nascimento']))->format("d/m/Y");
                    }
                }

                echo json_encode($alunos ?: []);
            } else {
                echo json_encode([]);
            }
        }
    } catch (Throwable $e) {
        echo json_encode([]);
    }
}
