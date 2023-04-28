package pt.egf.api.application.model;

public class Servidor {

    private String id;
    private String nome;
    private String ip;

    public Servidor(String id, String nome, String ip) {
        this.id = id;
        this.nome = nome;
        this.ip = ip;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }
}
