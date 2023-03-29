<table>
    <thead>
        <tr>
            <th colspan="2" style="text-align: center">Tipos de Productos</th>
        </tr>
        <tr>
            <th style="text-align: center">Código</th>
            <th style="text-align: center">Descripción</th>
        </tr>
    </thead>
    <tbody>
        @for ($t = 0; $t < count($types); $t++)
            <tr>
                <td>{{ $types[$t]->tipr_id }}</td>
                <td>{{ $types[$t]->tipr_descripcion}}</td>
            </tr>
        @endfor
    </tbody>
</table>