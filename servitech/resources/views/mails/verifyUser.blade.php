<html lang="es">
<head>
    <link rel="stylesheet" href="{{ asset('css/mails.css') }}" />
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100&display=swap');
    </style>
</head>
<body >

    <div style="background-color: #1c1d26; font-family: roboto, Helvetica, sans-serif; 
        color: rgba(255, 255, 255, 0.5); font-weight: lighter; width: 100%;">
        <div style="padding: 3%;">
            <div style="border: 10px solid rgba(255, 255, 255, 0.5);"><br>
                <h1 style="text-align: center">Bienvenido Servitech</h1>

                <div style="margin-left: 30px; margin-right: 30px; text-align: justify;">
                    Bienvenido {{$nombres}} {{$apellidos}}, Ya estas registrado en nuestra pagina web Servitech y 
                    por mayor seguridad, recuerda que este codigo de verificación fue generado con numeros aleatorios 
                </div><br>
            
                <div style="font-size: 18px; text-align: center; width: 15%; margin-left: auto; margin-right: auto;"> 
                    <div style="border: 5px solid rgba(255, 255, 255, 0.5);">
                        Codigo {{$view}}
                    </div>
                </div><br><br>
            </div>
        </div>
    </div>

    
    
    
</body>
</html>