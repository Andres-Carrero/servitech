<table>
    <thead>
        <tr>
            <th colspan="2" style="text-align: center">Niveles de Prioridad</th>
        </tr>
        <tr>
            <th style="text-align: center">Código</th>
            <th style="text-align: center">Descripción</th>
        </tr>
    </thead>
    <tbody>
        @for ($t = 0; $t < count($data); $t++)
            <tr>
                <td>{{ $data[$t]['id'] }}</td>
                <td>{{ $data[$t]['value'] }}</td>
            </tr>
        @endfor
    </tbody>
</table>