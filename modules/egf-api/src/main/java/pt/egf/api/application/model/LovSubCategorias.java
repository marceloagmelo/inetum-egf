package pt.egf.api.application.model;

import java.io.Serializable;
import java.util.List;

public class LovSubCategorias implements Serializable {

    private static final long serialVersionUID = 1L;

    private Boolean hasMoreData;
    private List<SubCategoria> subCategorias;

    public LovSubCategorias(Boolean hasMoreData, List<SubCategoria> subCategorias) {
        this.hasMoreData = hasMoreData;
        this.subCategorias = subCategorias;
    }

    public Boolean getHasMoreData() {
        return hasMoreData;
    }

    public void setHasMoreData(Boolean hasMoreData) {
        this.hasMoreData = hasMoreData;
    }

    public List<SubCategoria> getSubCategorias() {
        return subCategorias;
    }

    public void setSubCategorias(List<SubCategoria> subCategorias) {
        this.subCategorias = subCategorias;
    }
}
