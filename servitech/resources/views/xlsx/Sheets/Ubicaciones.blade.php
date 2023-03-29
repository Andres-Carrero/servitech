<table>
    <thead>
        <tr>
            <th colspan="2" style="text-align: center">Ubicaciones</th>
        </tr>
        <tr>
            <th style="text-align: center">Código</th>
            <th style="text-align: center">Descripción</th>
        </tr>
    </thead>
    <tbody>
        @for ($t = 0; $t < count($data); $t++)
            <tr>
                <td>{{ $data[$t]->ubi_id }}</td>
                <td>{{ $data[$t]->ubi_descripcion}}</td>
            </tr>
        @endfor
    </tbody>
</table>