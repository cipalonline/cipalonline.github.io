+++
title = 'Guía de Instalación de Arch Linux'
date = 2024-03-22T01:38:38-04:00
description = "Descubre cómo instalar Arch Linux, el sistema operativo que te da control total. Este post te lleva paso a paso por la configuración inicial, creando un entorno a tu medida."
tags = [
    "Arch",
    "Linux",
    "Instalación de un OS",
]
categories = [
    "Linux",
]
aliases = ['arch-linux-installation-guide']
+++

Bienvenido a esta guía para instalar Arch Linux en tu computadora. Esta guía se basa en la [Wiki oficial de Arch Linux](https://wiki.archlinux.org/) para asegurar que estás recibiendo información precisa y actualizada. Para más información y soporte, el foro oficial de Arch Linux es un recurso invaluable. Aquí, encontrarás la [**Guía de Instalación oficial**](https://wiki.archlinux.org/title/installation_guide), junto con una gran cantidad de conocimientos de la comunidad de Arch Linux.

Además de los procedimientos estándar, esta guía añade diferentes comandos y estrategias diseñadas para hacer el proceso de instalación más rápido y fácil, ya seas un usuario experimentado de Linux o un recién llegado al mundo de los sistemas operativos de código abierto.

Debemos aclarar que esta guía se centrará en la instalación básica de Arch. Si quieres usar un entorno gráfico, puedes consultar el resto de nuestras guías:

 - [BSPWM](/posts/bspwm-arch-installation-guide/bspwm-arch-installation-guide/)

También puedes consultar la Wiki oficial de Arch, que proporciona guías completas para instalar varios [entornos de escritorio](https://wiki.archlinux.org/title/Desktop_environment).

# 1) Pre-instalación <a name='id-1'>

*- **Nota**: Es importante aclarar que todo lo que se haga en la sección de pre-instalación no tendrá ningún impacto en la computadora. Sin embargo, a partir de la [preparación del disco](#id-2) en adelante, los cambios serán irreversibles.*

## 1.1) Preparación del medio de instalación <a name='id-1.1'>

*- **Omisión**: Si vas a realizar este proceso en una máquina virtual puedes saltarte este paso.*

Antes de empezar, necesitamos obtener la imagen de instalación (ISO). Puedes obtenerla de la sección de [Descargas de Arch Linux](https://archlinux.org/download/) donde puedes descargarla vía Magnet Link, Torrent, o HTTP directo.

Después de descargar la ISO, necesitamos preparar el medio de instalación. Para esto, puedes usar cualquier programa para crear unidades de arranque USB, sin embargo, recomendamos usar [Ventoy](https://www.ventoy.net/en/index.html). Si usas Windows, también puedes usar [Rufus](https://rufus.ie/en/).

Una vez creado el medio de instalación y arrancado desde él, llegarás a la pantalla de bienvenida de Arch Linux y estarás conectado como el usuario root en la consola virtual.

*- **Nota**: La imagen de Arch Linux no soporta Secure Boot. Necesitarás desactivarlo en tu máquina para poder arrancar desde el medio de instalación.*

## 1.2) Configuración de la red <a name='id-1.2'></a>

*- **Omisión**: Si el ordenador en el que vas a instalar Arch está conectado por cable, puedes saltarte la siguiente parte, ya que es la configuración de la conexión inalámbrica.*

Vamos a usar la herramienta `iwctl` para la configuración de internet

    $ iwctl

Después de ejecutar el comando tienes que buscar el nombre técnico de tu tarjeta wifi con el comando `device list`.

    $ device list

El nombre de tu tarjeta wifi será el que colocarás en la sección **wlan**.

    $ station <wlan> connect <Nombre de la Red>

*- **Nota**: Si tu red está oculta, debes reemplazar el `connect` con el atributo `connect-hidden`.*

Después de esto, es aconsejable probar la conexión con el comando `ping`.

# 2) Preparación del Disco  <a name='id-2'></a>

*- **Nota**: Si quieres hacer una instalación más fácil, puedes usar el script `archinstall`. Sin embargo, en esta guía, vamos a usar la instalación manual. Si quieres usar el script, puedes referirte a la [documentación oficial](https://wiki.archlinux.org/title/Archinstall).*

## 2.1) Particionando el disco <a name='id-2.1'></a>

El primer paso es identificar la ruta de la partición que queremos administrar. Podemos hacer esto usando el comando `fdisk -l`, que enumera todos los discos y sus particiones.

Cuando ejecutes `fdisk -l`, busca tu disco en la salida. Puedes identificar tu disco basándote en su tamaño o modelo. En este caso, tenemos una unidad NVMe, por lo que aparece como `nvme0n1`.

Una vez que hayas identificado tu disco, puedes usar el comando `cfdisk` seguido de la ruta a tu disco. En nuestro caso, el comando sería:

    $ cfdisk /dev/nvme0n1

Vamos a usar la herramienta `cfdisk` para particionar el disco en tres secciones: arranque, intercambio y raíz. Es recomendable usar el tipo de etiqueta **gpt**, ya que es prevalente en los sistemas UEFI. Si ya tienes particiones creadas desde un sistema operativo anterior, necesitarás eliminar todas ellas.

- **La partición de arranque**: Esta partición es esencial para que el sistema arranque. Se recomienda asignar al menos 100M para la partición de arranque.
- **La partición de intercambio**: La partición de intercambio actúa como un desbordamiento para la memoria de tu sistema, asegurando un funcionamiento suave cuando tu RAM está completamente utilizada. El tamaño de la partición de intercambio debe ser una potencia de 2 (2, 4, 8, 16, etc.), dependiendo del tamaño de tu disco duro. En este caso, se recomienda que la partición de intercambio sea de al menos 8GB.
- **La partición raíz**: Esta partición contendrá tu sistema operativo, aplicaciones y archivos. Asigna el espacio restante del disco duro a la partición raíz.

Una vez que hayas particionado el disco, escribe los cambios y sal de la herramienta `cfdisk`.

Para listar las particiones y seguir tu progreso, usa el comando `lsblk`. Este comando es crucial para confirmar el ID, tamaño y tipo de las particiones. Si lo hiciste correctamente, al listar las particiones deberían salir de la siguiente manera:

```
NAME        MAJ:MIN RM   SIZE RO TYPE
nvme0n1     259:0    0 476.9G  0 disk 
├─nvme0n1p1 259:1    0   100M  0 part 
├─nvme0n1p2 259:2    0     8G  0 part 
└─nvme0n1p3 259:3    0 468.8G  0 part 
```

Es importante conocer el número al final de las particiones, ya que será necesario para poder formatearlas y montarlas de la manera correcta. En este caso, la partición que termina en 1 es la de arranque, la que termina en 2 es la de intercambio, y la que termina en 3 es la raíz.

## 2.2) Formateando las Particiones <a name='id-2.2'></a>

En este paso, vamos a formatear las tres particiones que hemos creado.

*- **Nota:** Recuerda reemplazar `/dev/nvme0n1pX` con las rutas reales de tus particiones si son diferentes. Siempre verifica dos veces tus comandos antes de ejecutarlos para evitar la pérdida de datos.*

1. **Partición Raíz**: La primera partición que necesitamos formatear es la partición raíz. Esto se puede lograr usando el siguiente comando:

        $ mkfs.ext4 /dev/nvme0n1p3

    Este comando formatea la partición como un sistema de archivos **ext4**, que es una elección común para las instalaciones de Linux debido a su robustez y excelente rendimiento.

2. **Partición de Arranque**: A continuación, vamos a formatear la partición de arranque usando el siguiente comando:

        $ mkfs.fat -F 32 /dev/nvme0n1p1

    Este comando formatea la partición con un sistema de archivos **FAT32**. FAT32 se usa comúnmente para particiones de arranque ya que es universalmente soportado por casi todos los sistemas operativos.

3. **Partición de Intercambio**: Finalmente, vamos a configurar la partición de intercambio con el siguiente comando:

        $ mkswap /dev/nvme0n1p2

    Este comando inicializa la partición para ser utilizada como espacio de intercambio.

## 2.3) Montando las Particiones <a name='id-2.3'></a>

En este paso, vamos a montar las particiones. Primero, comencemos con la partición **raíz**. Puedes montarla usando el siguiente comando:

    $ mount /dev/nvme0n1p3 /mnt

A continuación, necesitamos montar la partición de **arranque**. Sin embargo, la ruta requerida aún no existe. Por lo tanto, la crearemos usando el siguiente comando:

    $ mkdir -p /mnt/boot/efi

Con la ruta ahora creada, podemos proceder a montar la partición de **arranque**:

    $ mount /dev/nvme0n1p1 /mnt/boot/efi

Por último, la partición de **intercambio** no necesita ser montada en el sentido tradicional. En su lugar, necesita ser activada. Puedes hacer esto con el siguiente comando:

    $ swapon /dev/nvme0n1p2

# 3) Instalación del Sistema <a name='id-3'></a>

## 3.1) Paquetes Básicos <a name='id-3.1'></a>

El proceso de instalación implica seleccionar los paquetes deseados y montarlos en el directorio `/mnt`. Se recomienda instalar al menos los siguientes paquetes: `base`, `linux`, `linux-firmware`, `base-devel`, `grub`, `efibootmgr`, `nano`, `networkmanager`, `git`, `pulseaudio` e `intel-ucode`.

*Nota: Para aquellos que usan un procesador AMD, es necesario instalar el paquete `amd-ucode` en lugar de `intel-ucode`. Esto asegurará que tu sistema tenga las últimas actualizaciones de microcódigo de AMD.*

Para instalar estos paquetes, usa el siguiente comando:

    $ pacstrap /mnt base linux linux-firmware base-devel grub efibootmgr nano networkmanager git pulseaudio intel-ucode

Este comando instalará el sistema base junto con el kernel de Linux y el firmware, las herramientas de desarrollo, el gestor de arranque GRUB, el gestor de arranque EFI, un editor de texto básico (nano), el gestor de red, Git para el control de versiones y el microcódigo para los procesadores Intel.

## 3.2) Tabla del Sistema de Archivos <a name='id-3.2'></a>

Una vez que hayas instalado las herramientas necesarias, el siguiente paso es generar un archivo **fstab**, que permite a tu sistema montar automáticamente las particiones al arrancar. Puedes generar un archivo **fstab** usando el siguiente comando:

    $ genfstab /mnt

Este comando mostrará información sobre los archivos actualmente montados. Sin embargo, necesitas transferir esta información al disco. Para hacer esto, puedes redirigir la salida del comando `genfstab` al archivo **fstab** ubicado en el directorio `/mnt/etc/`:

    $ genfstab /mnt > /mnt/etc/fstab

Para asegurarte de que el archivo **fstab** se ha generado correctamente, puedes usar el comando `cat` para mostrar su contenido:

    $ cat /mnt/etc/fstab

La salida debe coincidir con la salida inicial del comando `genfstab /mnt`. Si es así, entonces has generado con éxito tu archivo **fstab** y estás listo para proceder al siguiente paso del proceso de instalación.

## 3.3) Cambiando al Sistema Instalado (Cambiando la Raíz) <a name='id-3.3'></a>

En este paso, haremos la transición a nuestro nuevo entorno de sistema instalado. Para hacer esto, usamos el siguiente comando:

    $ arch-chroot /mnt

*- **Nota**: Es importante explicar que todo lo que habíamos hecho hasta ahora había sido en el medio de instalación, sin embargo, con el comando anterior cambiamos a nuestro PC. Esto significa que en caso de que haya un problema y no podamos acceder a nuestro PC, podemos usar el medio de instalación para acceder al PC (Aclarando que una vez que pongamos una contraseña en nuestro PC la necesitaremos si queremos acceder a él externamente).*

# 4) Configuración Interna <a name='id-4'></a>

## 4.1) Configurando la Zona Horaria <a name='id-4.1'></a>

El primer paso en nuestro proceso de configuración interna es establecer la zona horaria del sistema. Esto se puede hacer creando un enlace simbólico entre nuestra zona horaria deseada y `/etc/localtime`. Después de establecer la zona horaria, comprobaremos la fecha del sistema y sincronizaremos el reloj de hardware con el reloj del sistema. Los comandos son los siguientes:

*- **Nota**: Reemplaza 'Continente' y 'Ciudad' con tu ubicación específica.*

    $ ln -sf /usr/share/zoneinfo/Continente/Ciudad /etc/localtime
    $ date
    $ hwclock --systohc

## 4.2) Configurando la Localización <a name='id-4.2'></a>

A continuación, configuraremos la localización del sistema. Esto implica editar el archivo `locale.gen` para descomentar la línea correspondiente a nuestra localización deseada. En este caso, estaremos usando `en_US.UTF-8 UTF-8`. Después de guardar los cambios, generamos la nueva configuración de localización usando el comando `locale-gen`.

    $ nano /etc/locale.gen
    # Descomentar la línea: en_US.UTF-8 UTF-8
    $ locale-gen

Para que ciertos programas funcionen correctamente, necesitamos especificar nuestra localización en el archivo `/etc/locale.conf`. Podemos hacer esto añadiendo la línea `LANG=en_US.UTF-8` al archivo.

    echo LANG=en_US.UTF-8 > /etc/locale.conf

Ahora, tu localización a nivel de sistema está establecida y será reconocida por todos los programas conscientes de la localización en tu sistema. Recuerda reemplazar `en_US.UTF-8` con tu localización deseada si es diferente.

## 4.3) Configurando el Diseño del Teclado (Keymap) <a name='id-4.3'></a>

Si estás usando un teclado en inglés, este paso puede no ser necesario. Sin embargo, si necesitas cambiar el diseño del teclado, puedes hacerlo modificando el archivo `/etc/vconsole.conf`.

Para establecer el diseño del teclado en inglés de EE.UU., añade la siguiente línea al archivo:

    $ echo KEYMAP=us > /etc/vconsole.conf

Si quieres usar una variante del diseño de EE.UU., como el diseño internacional, lo añadirías así:

    $ echo KEYMAP=us-acentos > /etc/vconsole.conf

## 4.4) Estableciendo el Nombre de Host <a name='id-4.4'></a>

El nombre de host es un aspecto crucial de la configuración de tu sistema porque determina el nombre interno de tu computadora. Para establecer el nombre de host, necesitas acceder al archivo ubicado en `/etc/hostname` e introducir allí el nombre deseado. Así es como puedes hacerlo:

    $ echo TuNombreDeHostDeseado > /etc/hostname

Reemplaza 'TuNombreDeHostDeseado' con el nombre que quieras asignar a tu computadora.

## 4.5) Estableciendo la Contraseña de Root <a name='id-.5'></a>

Establecer la contraseña de root es vital para la seguridad de tu sistema. La contraseña de root es lo que usarás cada vez que necesites acceder como sudo, por lo que debe ser compleja para prevenir el acceso no autorizado.

Puedes establecer la contraseña de root usando el comando `passwd`. Después de introducir el comando, se te pedirá que escribas tu contraseña dos veces para confirmarla. Así es como puedes hacerlo:

    $ passwd
    # Se te pedirá que escribas tu contraseña dos veces

Recuerda, una contraseña fuerte típicamente incluye una mezcla de letras mayúsculas y minúsculas, números y caracteres especiales.

## 4.6) Creando un Nuevo Usuario <a name='id-4.6'></a>

Usaremos el comando `useradd` con la opción `-m`, que instruye al sistema a crear un directorio `/home` para la nueva cuenta. La opción `-G` se utiliza para especificar el grupo que debe ser propietario del directorio home del usuario, en este caso, `wheel`. La opción `-s` establece la shell predeterminada para el usuario, que estableceremos en `/bin/bash`. Reemplaza '(nombre)' con el nombre de usuario deseado.

    $ useradd -m -G wheel -s /bin/bash (nombre)

Ahora necesitaremos una contraseña para nuestro nuevo usuario:

    $ passwd (nombre)

A continuación, configuraremos sudo para el nuevo usuario. Tal como está, si cambiamos a nuestro nuevo usuario usando el comando `su (usuario)` e intentamos ejecutar un comando con sudo (por ejemplo, `sudo pacman -Syu`), encontraremos un error.

*- **Nota**: Si cambias a tu nuevo usuario usando el comando `su (usuario)`, necesitarás salir de tu sesión de usuario usando el comando `exit` o `sudo su`. Esto se debe a que necesitamos privilegios de root para poder modificar el archivo.*

Para rectificar esto, abriremos el archivo sudoers usando el comando **visudo** con nuestro editor preferido establecido por la variable de entorno **EDITOR**:

    $ EDITOR=nano visudo

En el archivo sudoers, localiza y descomenta la línea `%wheel ALL=(ALL) ALL`. Esto otorga a todos los miembros del grupo **wheel** plenos privilegios de sudo.

Ahora, si volvemos a nuestro nuevo usuario e intentamos usar comandos sudo, deberíamos poder hacerlo sin encontrar ningún error.

## 4.7) Habilitando el Gestor de Red <a name='id-4.7'></a>

Para asegurarte de que tu sistema puede conectarse a internet, necesitarás habilitar el **Gestor de Red**. Esto se puede hacer ejecutando el siguiente comando:

    $ systemctl enable NetworkManager

## 4.8) Instalando el Gestor de Arranque <a name='id-4.8'></a>

El siguiente paso, que es posiblemente el más crucial, implica instalar un gestor de arranque, porque sin un gestor de arranque tu sistema no podrá iniciar. En esta guía, usaremos GRUB como nuestro gestor de arranque. Para instalar GRUB, ejecuta el siguiente comando:

    $ grub-install /dev/nvme0n1

Después de instalar GRUB necesitamos configurarlo con el siguiente comando:

    $ grub-mkconfig -o /boot/grub/grub.cfg

## 4.9) Pasos Finales y Reinicio del Sistema <a name='id-4.9'></a>

Una vez que GRUB ha sido configurado, puedes salir del usuario root, desmontar todos los sistemas de archivos montados y reiniciar tu sistema. Esto se puede hacer ejecutando los siguientes comandos:

    $ exit
    $ umount -a
    $ reboot

Después de reiniciar, tu instalación de Arch Linux debería estar completa y lista para usar.

# 5) Tareas Post-Instalación <a name='id-5'></a>

## 5.1) Configuraciones Extras <a name='id-5.1'></a>

En el archivo `/etc/pacman.conf`, recomendamos encarecidamente hacer algunos ajustes para mejorar tu experiencia. Primero, encuentra la línea que dice `Color` y descoméntala. Esto habilitará la salida en color, facilitando la lectura y comprensión de la información mostrada en tu terminal.

A continuación, busca `ParallelDownloads` y establece su valor en 5. Esto permite que se descarguen múltiples paquetes simultáneamente, acelerando el proceso de instalación.

Finalmente, descomenta la línea `ILoveCandy`. Aunque esto no afecta a la funcionalidad, sí reemplaza la barra de progreso de descarga estándar por una divertida barra temática de caramelos. Es un pequeño detalle, pero añade un poco de capricho a tu proceso de configuración de Arch Linux.

## 5.2) Estableciendo la Conexión a Internet <a name='id-5.2'></a>

Una vez instalado el sistema, se recomienda volver a probar la conexión a internet. Esto se puede hacer usando el comando `ping`.

    $ ping -c 3 www.google.com

Si no puedes establecer una conexión a internet, tendrás que usar el comando `nmcli`.

### Añadiendo una nueva conexión inalámbrica

Para añadir una nueva conexión, puedes usar el siguiente comando:

    $ nmcli c add type wifi con-name <nombre de conexión> ifname <wlan> ssid <ssid>

Este comando crea una nueva conexión con el tipo `wifi`. El `<nombre de conexión>` es el nombre que asignas a la conexión, `<wlan>` es el nombre de la interfaz, y `<ssid>` es el SSID de la red inalámbrica.

*- **Nota**: El `nombre de conexión` es un identificador personalizable que puedes asignar a tu red. Este nombre no es fijo y puede cambiarse según tu preferencia.*

### Conectándose a una conexión inalámbrica existente

Para conectarte a una red inalámbrica, usa:

    $ nmcli dev wifi connect <ssid> password <contraseña>

*- **Nota**: Si tu conexión Wi-Fi está oculta, debes añadir el parámetro `hidden yes` al final del comando anterior.*

### Eliminando una conexión inalámbrica existente

Si necesitas eliminar una conexión, puedes hacerlo con:

    $ nmcli c delete <nombre de conexión>

## 5.3) Configurando el DNS  <a name='id-5.3'></a>

Uno de los pasos cruciales para configurar tu conexión a internet es configurar el Sistema de Nombres de Dominio (DNS). Este paso es importante para garantizar una conectividad sin problemas y evitar posibles problemas, como los que podrían ocurrir con los servicios de Microsoft.

Para comenzar, necesitas identificar el nombre de tu conexión. Esto se puede hacer ejecutando el siguiente comando en tu terminal:

    $ nmcli con

Este comando enumerará todas tus conexiones activas. Identifica la conexión para la que quieres establecer el DNS.

Una vez que tienes el nombre de tu conexión (referido como `<ssid>`), puedes modificar su configuración de DNS. Los servidores DNS de Google (`8.8.8.8` y `8.8.4.4`) se utilizan comúnmente debido a su fiabilidad. Para establecer estos como tus servidores DNS, usa el siguiente comando:

    $ nmcli con mod "<ssid>" ipv4.dns "8.8.8.8 8.8.4.4"

Reemplaza `<ssid>` con el nombre de tu conexión. Este comando establece los servidores DNS para tu conexión especificada en los servidores DNS de Google.

## 5.4) Optimización de la Batería <a name='id-5.4'></a>

Si estás instalando Arch Linux en un portátil, la optimización de la vida de la batería es crucial. Una herramienta efectiva para este propósito es `auto-cpufreq`. Esta utilidad ajusta dinámicamente la frecuencia de tu CPU en función de la carga y la fuente de alimentación. Así es como puedes instalarla y usarla:

Primero, clona el repositorio de GitHub:

    $ git clone https://github.com/AdnanHodzic/auto-cpufreq.git

A continuación, navega al directorio clonado y ejecuta el instalador:

    $ cd auto-cpufreq && sudo ./auto-cpufreq-installer

Una vez que la instalación esté completa, necesitas activar `auto-cpufreq`. Puedes hacer esto ejecutando el siguiente comando:

    $ sudo auto-cpufreq --install

Recuerda, `auto-cpufreq` requiere privilegios de root para hacer cambios en tu sistema. Siempre ten cuidado al usar `sudo` con cualquier comando.

Con `auto-cpufreq` instalado y activo, tu portátil debería estar ahora mejor optimizado para la duración de la batería. Para obtener información más detallada sobre el rendimiento de tu sistema, puedes usar el comando `auto-cpufreq --stats` para mostrar estadísticas en tiempo real.

---

Los pasos subsiguientes dependen en gran medida de las preferencias del usuario, pero generalmente es aconsejable configurar un entorno gráfico para facilitar su uso.

Recuerda, la belleza de Arch Linux radica en su flexibilidad. Puedes personalizar tu sistema para que se adapte a tus preferencias. ¡Disfruta del viaje de hacer Arch Linux a tu manera!