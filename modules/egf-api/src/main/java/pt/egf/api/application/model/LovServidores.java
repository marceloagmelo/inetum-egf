package pt.egf.api.application.model;

import java.io.Serializable;
import java.util.List;

public class LovServidores implements Serializable {

    private static final long serialVersionUID = 1L;

    private Boolean hasMoreData;
    private List<Servidor> servidores;

    public LovServidores(Boolean hasMoreData, List<Servidor> servidores) {
        this.hasMoreData = hasMoreData;
        this.servidores = servidores;
    }

    public Boolean getHasMoreData() {
        return hasMoreData;
    }

    public void setHasMoreData(Boolean hasMoreData) {
        this.hasMoreData = hasMoreData;
    }

    public List<Servidor> getServidores() {
        return servidores;
    }

    public void setServidores(List<Servidor> servidores) {
        this.servidores = servidores;
    }
}
