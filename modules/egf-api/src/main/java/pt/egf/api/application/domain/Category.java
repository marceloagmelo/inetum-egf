package pt.egf.api.application.domain;

import java.util.List;

public class Category {

    private String hasMoreData;
    private List<List<LovRow>> lovRows;

    public String getHasMoreData() {
        return hasMoreData;
    }

    public void setHasMoreData(String hasMoreData) {
        this.hasMoreData = hasMoreData;
    }

    public List<List<LovRow>> getLovRows() {
        return lovRows;
    }

    public void setLovRows(List<List<LovRow>> lovRows) {
        this.lovRows = lovRows;
    }

    public String toString() {
        return "Category{" +
                "hasMoreData = " + hasMoreData +
                ", lovRows = " + lovRows +
                "}";
    }
}
