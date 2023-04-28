package pt.egf.api.application;

import org.osgi.service.component.annotations.Component;
import org.osgi.service.component.annotations.Reference;
import org.osgi.service.jaxrs.whiteboard.JaxrsWhiteboardConstants;
import pt.egf.api.application.domain.ApiError;
import pt.egf.api.application.model.LovCategorias;
import pt.egf.api.application.model.LovEmpresas;
import pt.egf.api.application.model.LovServidores;
import pt.egf.api.application.model.LovSubCategorias;
import pt.egf.api.application.service.CategoriaService;
import pt.egf.api.application.service.EmpresaService;
import pt.egf.api.application.service.ServidorService;
import pt.egf.api.application.service.SubCategoriaService;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
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

	@Reference
	private CategoriaService categoriaService;
	@Reference
	private SubCategoriaService subCategoriaService;
	@Reference
	private EmpresaService empresaService;
	@Reference
	private ServidorService servidorService;

	public Set<Object> getSingletons() {
		return Collections.<Object>singleton(this);
	}

	@GET
	@Path("/categorias")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getCategorias() {
		LovCategorias lov = categoriaService.getCategorias();

		if (null != lov) {
			return Response.ok(lov).build();
		} else {
			ApiError erro = new ApiError(String.valueOf(Response.status(Response.Status.NOT_FOUND).build().getStatus()), "Lista vazia!");
			return Response.status(Response.Status.NOT_FOUND).entity(erro).build();
		}
	}

	@GET
	@Path("/subcategorias")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getSubCategorias() {
		LovSubCategorias lov = subCategoriaService.getSubCategorias();

		if (null != lov) {
			return Response.ok(lov).build();
		} else {
			ApiError erro = new ApiError(String.valueOf(Response.status(Response.Status.NOT_FOUND).build().getStatus()), "Lista vazia!");
			return Response.status(Response.Status.NOT_FOUND).entity(erro).build();
		}
	}

	@GET
	@Path("/empresas")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getEmpresas() {
		LovEmpresas lov = empresaService.getEmpresas();

		if (null != lov) {
			return Response.ok(lov).build();
		} else {
			ApiError erro = new ApiError(String.valueOf(Response.status(Response.Status.NOT_FOUND).build().getStatus()), "Lista vazia!");
			return Response.status(Response.Status.NOT_FOUND).entity(erro).build();
		}
	}

	@GET
	@Path("/servidores")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getServidores() {
		LovServidores lov = servidorService.getServidores();

		if (null != lov) {
			return Response.ok(lov).build();
		} else {
			ApiError erro = new ApiError(String.valueOf(Response.status(Response.Status.NOT_FOUND).build().getStatus()), "Lista vazia!");
			return Response.status(Response.Status.NOT_FOUND).entity(erro).build();
		}
	}

}