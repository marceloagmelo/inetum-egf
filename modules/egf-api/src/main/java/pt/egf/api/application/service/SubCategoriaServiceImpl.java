package pt.egf.api.application.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import pt.egf.api.application.domain.Lov;
import pt.egf.api.application.domain.LovRow;
import pt.egf.api.application.model.Categoria;
import pt.egf.api.application.model.LovSubCategorias;
import pt.egf.api.application.model.SubCategoria;
import pt.egf.api.application.util.api.SimpleFlowApi;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component(
        immediate = true,
        service = SubCategoriaService.class
)
public class SubCategoriaServiceImpl implements SubCategoriaService {

    @Reference
    protected SimpleFlowApi simpleFlowApi;

    @Override
    public LovSubCategorias getSubCategorias() {
        LovSubCategorias lovSubCategorias = null;
        List<SubCategoria> listaSubCategoria = null;
        int contadorSubCategoria = 0;

        String json = "{" +
                "    \"fieldSearch\": {[{}]" +
                "}";

        String ret = simpleFlowApi.callService(null, "/subcategorias", json);

        if (!ret.isBlank()) {
            listaSubCategoria = new ArrayList<SubCategoria>();
            ObjectMapper objectMapper = new ObjectMapper();

            try {
                Lov lov = objectMapper.readValue(ret, Lov.class);

                System.out.println(ret);

                List<List<LovRow>> lovRows = lov.getLovRows();
                Iterator<List<LovRow>> iterator = lovRows.iterator();
                while (iterator.hasNext()) {
                    List<LovRow> ll = iterator.next();
                    Iterator<LovRow> it = ll.iterator();

                    Categoria categoria = new Categoria();
                    while (it.hasNext()) {
                        contadorSubCategoria++;

                        String nomeCategoria = it.next().getValue();

                        categoria.setId("");
                        categoria.setNome(nomeCategoria);

                        String nomeSubCategoria = it.next().getValue();

                        SubCategoria subCategoria = new SubCategoria(String.valueOf(contadorSubCategoria), nomeSubCategoria, categoria);
                        listaSubCategoria.add(subCategoria);

                    }
                }
                lovSubCategorias = new LovSubCategorias(Boolean.valueOf(lov.getHasMoreData()), listaSubCategoria);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return lovSubCategorias;
    }
}
