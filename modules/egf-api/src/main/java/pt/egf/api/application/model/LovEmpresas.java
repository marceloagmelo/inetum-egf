package pt.egf.api.application.model;

import java.io.Serializable;
import java.util.List;

public class LovEmpresas implements Serializable {

    private static final long serialVersionUID = 1L;

    private Boolean hasMoreData;
    private List<Empresa> empresas;

    public LovEmpresas(Boolean hasMoreData, List<Empresa> empresas) {
        this.hasMoreData = hasMoreData;
        this.empresas = empresas;
    }

    public Boolean getHasMoreData() {
        return hasMoreData;
    }

    public void setHasMoreData(Boolean hasMoreData) {
        this.hasMoreData = hasMoreData;
    }

    public List<Empresa> getEmpresas() {
        return empresas;
    }

    public void setEmpresas(List<Empresa> empresas) {
        this.empresas = empresas;
    }
}
