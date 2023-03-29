<?php

namespace App\Imports;

use App\Models\Productos;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\HasReferencesToOtherSheets;

class SheetProducts implements ToModel, WithHeadingRow, HasReferencesToOtherSheets {
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row){
        $prod = Productos::where('prod_id', $row['codigo'])->first();
        if(isset($prod) == false){
            Productos::create([
                'prod_id' => $row['codigo'],
                'prod_nombre' => $row['nombre'],
                'prod_marca' => $row['marca'],
                'prod_precio_venta' => 0,
                'prod_cantidad' => 0,
                'prod_linea' => $row['linea'],
                'prod_ubicacion_id' => $row['ubicacion'],
                'prod_estado_id' => 1,
                'prod_tipo_id' => $row['tipo'],
                'prod_iva' => $row['iva']
            ]);
        }
    }

}
