<?php

namespace App\Imports;

use App\Models\Especificaciones;
use App\Models\Productos;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\HasReferencesToOtherSheets;

class SheetEspecificaciones implements ToModel, WithHeadingRow, HasReferencesToOtherSheets {
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function model(array $row){
        $prod = Productos::where('prod_id', $row['codigo_de_producto'])->first();
        if(isset($prod) == true){
            $espec = Especificaciones::where('esp_producto_id', $row['codigo_de_producto'])->get(['esp_id', 'esp_titulo']);
            if(count($espec) < 21){
                $validateEspec = Especificaciones::where('esp_producto_id', $row['codigo_de_producto']) ->where('esp_titulo', $row['titulo'])->get(['esp_id', 'esp_titulo']);
                if(count($validateEspec) == 0){
                    Especificaciones::create([
                        'esp_titulo' => $row['titulo'],
                        'esp_descripcion' => $row['descripcion'],
                        'esp_importancia' => $row['nivel_de_importancia'],
                        'esp_producto_id' => $row['codigo_de_producto']
                    ]);
                }
            }
        }
    }

}
