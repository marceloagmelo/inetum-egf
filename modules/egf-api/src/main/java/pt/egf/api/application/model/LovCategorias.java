package pt.egf.api.application.model;

import java.io.Serializable;
import java.util.List;

public class LovCategorias implements Serializable {

    private static final long serialVersionUID = 1L;

    private Boolean hasMoreData;
    private List<Categoria> categorias;

    public LovCategorias(Boolean hasMoreData, List<Categoria> categorias) {
        this.hasMoreData = hasMoreData;
        this.categorias = categorias;
    }

    public Boolean getHasMoreData() {
        return hasMoreData;
    }

    public void setHasMoreData(Boolean hasMoreData) {
        this.hasMoreData = hasMoreData;
    }

    public List<Categoria> getCategorias() {
        return categorias;
    }

    public void setCategorias(List<Categoria> categorias) {
        this.categorias = categorias;
    }
}
