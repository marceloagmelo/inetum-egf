package pt.egf.api.application;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.jaxrs.whiteboard.JaxrsWhiteboardConstants;
import pt.egf.api.application.domain.Categoria;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Set;

/**
 * @author marcelomelo
 */
@Component(
	property = {
		JaxrsWhiteboardConstants.JAX_RS_APPLICATION_BASE + "=/v1/egf",
		JaxrsWhiteboardConstants.JAX_RS_NAME + "=EgfApi.Rest"
	},
	service = Application.class
)
public class EgfApiApplication extends Application {

	public Set<Object> getSingletons() {
		return Collections.<Object>singleton(this);
	}

	@GET
	@Path("/categorias")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Categoria> getCategorias() {
		ArrayList<Categoria> lista = new ArrayList();
		Categoria categoria = new Categoria("1","Categoria A");
		lista.add(categoria);
		categoria = new Categoria("2","Categoria B");
		lista.add(categoria);

		return lista;
	}

}