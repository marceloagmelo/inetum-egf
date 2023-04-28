package pt.egf.api.application.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import pt.egf.api.application.domain.Lov;
import pt.egf.api.application.domain.LovRow;
import pt.egf.api.application.model.LovServidores;
import pt.egf.api.application.model.Servidor;
import pt.egf.api.application.util.api.SimpleFlowApi;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

@Component(
        immediate = true,
        service = ServidorService.class
)
public class ServidorServiceImpl implements ServidorService {
    @Reference
    protected SimpleFlowApi simpleFlowApi;

    @Override
    public LovServidores getServidores() {
        LovServidores lovServidores = null;
        List<Servidor> listaServidor = null;
        int contadorServidor = 0;

        String json = "{" +
                "    \"fieldSearch\": {[{}]" +
                "}";

        String ret = simpleFlowApi.callService(null, "/servidores", json);

        if (!ret.isBlank()) {
            listaServidor = new ArrayList<Servidor>();
            ObjectMapper objectMapper = new ObjectMapper();

            try {
                Lov lov = objectMapper.readValue(ret, Lov.class);

                System.out.println(ret);

                List<List<LovRow>> lovRows = lov.getLovRows();
                Iterator<List<LovRow>> iterator = lovRows.iterator();
                while (iterator.hasNext()) {
                    List<LovRow> ll = iterator.next();
                    Iterator<LovRow> it = ll.iterator();

                    for (LovRow lovRow: ll) {
                        contadorServidor++;

                        String nomeServidor = lovRow.getName();
                        String ip = lovRow.getValue();

                        Servidor servidor = new Servidor(String.valueOf(contadorServidor), nomeServidor, ip);
                        listaServidor.add(servidor);
                    }
                }
                lovServidores = new LovServidores(Boolean.valueOf(lov.getHasMoreData()), listaServidor);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }

        return lovServidores;
    }
}
