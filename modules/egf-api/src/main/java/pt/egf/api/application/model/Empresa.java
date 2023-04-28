package pt.egf.api.application.model;

public class Empresa {

    private String id;
    private String nome;

    public Empresa() {
        this.id = "";
        this.nome = "";
    }

    public Empresa(String id, String nome) {
        this.id = id;
        this.nome = nome;
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
}
