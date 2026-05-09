<?php

class Conexao
{
    private static $host = '';
    private static $dbname = '';
    private static $user = '';
    private static $senha = '';
    private static PDO $conexao;

    public static function getConexao(): PDO
    {
        if (empty($conexao)) {
            self::criarConexao();
        }
        return self::$conexao;
    }

    public static function criarConexao(): void
    {
        self::$conexao = new \PDO("mysql:host=".self::$host.";dbname=".self::$dbname, self::$user, self::$senha);

        self::$conexao->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);

        self::$conexao->setAttribute(\PDO::ATTR_DEFAULT_FETCH_MODE, \PDO::FETCH_ASSOC);
    }
}
