package pt.egf.api.application.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import pt.egf.api.application.domain.Lov;
import pt.egf.api.application.domain.LovRow;
import pt.egf.api.application.model.Categoria;
import pt.egf.api.application.model.LovCategorias;
import pt.egf.api.application.util.api.SimpleFlowApi;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component(
    immediate = true,
    service = CategoriaService.class
)
public class CategoriaServiceImpl implements CategoriaService {

    @Reference
    protected SimpleFlowApi simpleFlowApi;
    @Override
    public LovCategorias getCategorias() {
        LovCategorias lovCategorias = null;
        List<Categoria> listaCategoria = null;
        int contadorCategoria = 0;

        String json = "{" +
                "    \"fieldSearch\": {[{}]" +
                "}";

        String ret = simpleFlowApi.callService(null, "/categorias", json);

        if (!ret.isBlank()) {
            listaCategoria = new ArrayList<Categoria>();
            ObjectMapper objectMapper = new ObjectMapper();

            try {
                Lov lov = objectMapper.readValue(ret, Lov.class);

                System.out.println(ret);

                List<List<LovRow>> lovRows = lov.getLovRows();
                Iterator<List<LovRow>> iterator = lovRows.iterator();
                while (iterator.hasNext()) {
                    List<LovRow> ll = iterator.next();
                    Iterator<LovRow> it = ll.iterator();

                    while (it.hasNext()) {
                        contadorCategoria++;
                        String nomeCategoria = it.next().getValue();

                        Categoria categoria = new Categoria(String.valueOf(contadorCategoria), nomeCategoria);
                        listaCategoria.add(categoria);
                    }

                }

                lovCategorias = new LovCategorias(Boolean.valueOf(lov.getHasMoreData()), listaCategoria);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return lovCategorias;
    }
}
