package pt.egf.api.application.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import pt.egf.api.application.domain.Lov;
import pt.egf.api.application.domain.LovRow;
import pt.egf.api.application.model.Empresa;
import pt.egf.api.application.model.LovEmpresas;
import pt.egf.api.application.util.api.SimpleFlowApi;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component(
        immediate = true,
        service = EmpresaService.class
)
public class EmpresaServiceImpl implements EmpresaService {

    @Reference
    protected SimpleFlowApi simpleFlowApi;

    @Override
    public LovEmpresas getEmpresas() {
        LovEmpresas lovEmpresas = null;
        List<Empresa> listaEmpresa= null;

        int contadorEmpresa = 0;

        String json = "{" +
                "    \"fieldSearch\": {[{}]" +
                "}";

        String ret = simpleFlowApi.callService(null, "/empresas", json);

        if (!ret.isBlank()) {
            listaEmpresa = new ArrayList<Empresa>();
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
                        contadorEmpresa++;
                        String nomeEmpresa = it.next().getValue();

                        Empresa empresa = new Empresa(String.valueOf(contadorEmpresa), nomeEmpresa);
                        listaEmpresa.add(empresa);
                    }
                }
                lovEmpresas = new LovEmpresas(Boolean.valueOf(lov.getHasMoreData()), listaEmpresa);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return lovEmpresas;
    }
}