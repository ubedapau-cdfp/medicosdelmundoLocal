<?php

if (!headers_sent()) {
    header('Content-Type: text/html; charset=UTF-8');
}

class Database {
    // Valores predeterminados para MySQL/MariaDB en XAMPP.
    private $host = "localhost";
    private $port = "3306";
    private $dbname = "medicosDelMundo";
    private $user = "root";
    private $password = "";

    // Aquí guardamos la conexión PDO una vez creada
    private $conn = null;

    // Permite sobrescribir los valores predeterminados cuando sea necesario.
    public function __construct($host = null, $port = null, $dbname = null, $user = null, $password = null) {
        if ($host) $this->host = $host;
        if ($port) $this->port = $port;
        if ($dbname) $this->dbname = $dbname;
        if ($user) $this->user = $user;
        if ($password) $this->password = $password;
    }

    public function conectar() {
        if ($this->conn) {
            return $this->conn;
        }

        try {
            $dsn = "mysql:host={$this->host};port={$this->port};dbname={$this->dbname};charset=utf8mb4";
            $this->conn = new PDO($dsn, $this->user, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
            $this->conn->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        } catch (PDOException $e) {
            echo "Conexión fallida a MySQL: " . htmlspecialchars($e->getMessage(), ENT_QUOTES, 'UTF-8');
            exit;
        }

        return $this->conn;
    }
}

?>
