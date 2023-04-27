package pt.egf.api.application.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import pt.egf.api.application.domain.Category;
import pt.egf.api.application.domain.LovRow;
import pt.egf.api.application.model.Categoria;
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
    public List<Categoria> getCategorias() {
        List<Categoria> listaCategoria = null;
        int contadorCategoria = 0;

        String json = "{" +
                "    \"fieldSearch\": {[{}]" +
                "}";

        String ret = simpleFlowApi.callService(null, "/documentsCat1", json);

        if (!ret.isBlank()) {
            listaCategoria = new ArrayList<Categoria>();
            ObjectMapper objectMapper = new ObjectMapper();

            try {
                Category cat = objectMapper.readValue(ret, Category.class);

                System.out.println(ret);

                List<List<LovRow>> lovRows = cat.getLovRows();
                Iterator<List<LovRow>> iterator = lovRows.iterator();
                while (iterator.hasNext()) {
                    List<LovRow> ll = iterator.next();
                    Iterator<LovRow> it = ll.iterator();
                    int i=0;
                    while (it.hasNext()) {
                        contadorCategoria++;
                        String nomeCategoria = it.next().getValue();
                        System.out.printf("Pos %d- %s\n", i, nomeCategoria);
                        Categoria categoria = new Categoria(String.valueOf(contadorCategoria), nomeCategoria);
                        listaCategoria.add(categoria);
                    }

                }
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return listaCategoria;
    }
}
