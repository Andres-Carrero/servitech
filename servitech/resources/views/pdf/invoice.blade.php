


<div style="border: 1px solid; font-family: roboto, Helvetica, sans-serif;">
    <div style="padding: 5px">
        <p style="line-height: 0; text-align: right"><b>Fecha:</b> {{$data['mov']['mov_fecha']}}</p>
        <p style="line-height: 0; text-align: left; margin-top: -15px" ><b>Factura N°:</b> {{$data['mov']['mov_id']}}</p>
        <p style="line-height: 0; text-align: right"><b>Hora:</b> {{$data['mov']['mov_hora']}}</p>

    </div>
    <hr style="margin-top: -10px">
    

    <div style="padding: 5px">
        <div style="display: flex"> 
            <div style="float: right;">
                <img src="https://i.imgur.com/ALENuQd.png" style="width: 120px; height: 125px;">
                
            </div>
            <div>
                <div style="font-size: 40px;">Servitech S.A.S</div>
                <div style="line-height: 1">El Futuro es Ahora</div>
                <div style="line-height: 1.5; font-size: 10px">servitechADSI@gmail.com</div>
            </div>
        </div>
    </div>
    <br><br><hr>
    
    <div style="padding: 5px;" >
        <div style="text-align: center; font-size: 20px;" ><b>Datos del Cliente</b></div>

        <p style="line-height: 0.5"><b>Nombre Completo:</b> {{$data['mov']['usu_nombre']}} {{$data['mov']['usu_apellido']}}</p>
        <p style="line-height: 0.5"><b>Identificación:</b> {{$data['mov']['usu_identificacion']}}</p>
        <p style="line-height: 0.5"><b>Correo:</b> {{$data['mov']['email']}}</p>
        <p style="line-height: 0.5"><b>Teléfono:</b> {{$data['mov']['usu_telefono']}}</p>
        <p style="line-height: 0.5"><b>Dirección:</b> {{$data['mov']['usu_direccion']}}</p>
    </div>
    <hr>
    

    <div style="padding: 5px">
        <div style="text-align: center; font-size: 20px;"><b>Detalles de la Compra</b></div>

        <table style="width: 100%; text-align: center; border-color: #3f51b5 !important; margin-top:15px; font-family: roboto, Helvetica, sans-serif;">
            <thead style="background-color: #3f51b5 !important; color:#ffffff;">
              <tr>
                <th>N°</th>
                <th>Descripcion</th>
                <th>Marca</th>
                <th>Cantidad</th>
                <th>Precio Unit.</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody style="background-color: #ffffff; color:#000000; font-family: roboto, Helvetica, sans-serif; font-size: 12px">
              @foreach($data['sal'] as $item)
                <tr>
                  <td>{{ $item->prod_id }}</td>
                  <td>{{ $item->prod_nombre}}</td>
                  <td>{{ $item->prod_marca}}</td>
                  <td>{{ $item->sal_cantidad}}</td>
                  <td>$ {{ number_format($item->sal_precio) }}</td>
                  <td>$ {{ number_format($item->sal_total) }}</td>
                </tr>
              @endforeach
            </tbody>
          </table>
    </div>
    <hr>

    <div style="padding: 15px">
      <table style="width: 100%; text-align: center">
        <thead>
          <tr>
            <th>Recibido</th>
            <th>Cambio</th>
            <th>Total</th>
            <th>Iva ({{$data['mov']['mov_iva']}}%)</th>
            <th>TOTAL COMPRA</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>$ {{ number_format($data['mov']['mov_recibido']) }}</td>
            <td>$ {{ number_format($data['mov']['mov_cambio']) }}</td>
            <td>$ {{ number_format($data['mov']['mov_total']) }}</td>
            <td>$ {{ number_format($data['mov']['mov_total']*($data['mov']['mov_iva']/100) ) }}</td>
            <td>$ {{ number_format($data['mov']['mov_total_iva']) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>

  
    