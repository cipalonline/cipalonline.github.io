+++
title = 'Guía de Instalación de BSPWM en Arch Linux'
date = 2024-03-22T01:56:10-04:00
description = "Aprende a personalizar bspwm para un escritorio eficiente en Arch Linux. Este artículo te muestra cómo ajustar cada detalle para un espacio de trabajo perfectamente customizado."
tags = [
    "Customización",
    "Arch",
    "Linux",
]
categories = [
    "Linux",
]
aliases = ['bspwm-arch-installation-guide']
+++

Bienvenido a esta guía para instalar BSPWM en tu Arch Linux. Ya seas un usuario experimentado de Linux o un recién llegado, te tenemos cubierto. Te guiaremos a través del proceso, explicaremos los conceptos y proporcionaremos consejos y trucos para hacer tu experiencia suave y agradable.

*- **Nota**: Para seguir esta guía, asumimos que ya tienes Arch Linux instalado. Si aún no lo has instalado, puedes consultar la [Guía de Instalación de Arch Linux](/posts/arch-installation-guide/arch-installation-guide/).*

# 1) Instalación de BSPWM y SXHKD

Comenzaremos con la instalación de **bspwm** y **sxhkd**. BSPWM es un administrador de ventanas en mosaico y SXHKD, por otro lado, es un daemon independiente para vincular acciones a combinaciones de teclas y/o botones del ratón.

También instalaremos **lightdm**, que es un administrador de pantalla ligero, junto con **lightdm-gtk-greeter** y **lightdm-gtk-greeter-settings** para proporcionar una interfaz gráfica de usuario para la configuración. Finalmente, **xorg**, que es el sistema de ventanas público, gratuito y de código abierto más popular.

Para instalar estos paquetes, abre una terminal y ejecuta el siguiente comando:

    $ sudo pacman -S bspwm sxhkd lightdm lightdm-gtk-greeter lightdm-gtk-greeter-settings xorg

# 2) Inicialización del Entorno de Escritorio

## 2.1) Habilitando el Administrador de Pantalla

Ahora tenemos que inicializar el administrador de pantalla LightDM. Esto se puede hacer habilitándolo a través del control del sistema de la siguiente manera:

    $ sudo systemctl enable lightdm

## 2.2) Configuración de BSPWM y SXHKD

A continuación, necesitamos crear directorios personalizados para BSPWM y SXHKD en el directorio `.config`. Esto se puede hacer usando el comando `mkdir`:

    $ mkdir -p ~/.config/{bspwm,sxhkd}

Una vez creados los directorios, podemos proceder a instalar los archivos necesarios con los permisos apropiados. Usaremos el comando `install` para copiar los archivos de configuración de ejemplo de la documentación de BSPWM y SXHKD a nuestros directorios recién creados:

    $ install -Dm755 /usr/share/doc/bspwm/examples/bspwmrc ~/.config/bspwm/
    $ install -Dm644 /usr/share/doc/bspwm/examples/sxhkdrc ~/.config/sxhkd/

Después de instalar los archivos, es crucial modificar el archivo `sxhkdrc` ubicado en el directorio `.config/sxhkd/`. Este archivo contiene la configuración de las teclas de acceso rápido, incluyendo la del terminal. Si esto no se configura correctamente, puedes encontrar problemas al intentar abrir un terminal después de un reinicio del sistema.

En nuestro caso usaremos `Kitty` como nuestro emulador de terminal, por lo que la configuración sería la siguiente:

    # kitty
    super + Return
        kitty

# 3) Personalización de BSPWM

## 3.1) Instalación y Configuración de LXAppearance, Picom y Nitrogen

Instalaremos los paquetes `lxappearance`, `picom` y `nitrogen` para personalizar el entorno de escritorio.

### LXAppearance

**LXAppearance** es un administrador de temas independiente del escritorio que nos permite cambiar la apariencia de nuestro entorno de escritorio. Para instalarlo, ejecuta el siguiente comando:

    $ sudo pacman -S lxappearance

Una vez instalado, puedes ejecutar `lxappearance` en la terminal para abrir la interfaz gráfica de usuario. Aquí puedes cambiar el tema GTK, el tema de los iconos, la fuente y el cursor.

### Picom

**Picom** es un compositor independiente para Xorg, famoso por proporcionar efectos de sombreado y transparencia a las ventanas. Para instalarlo, ejecuta el siguiente comando:

    $ sudo pacman -S picom

Después de la instalación, puedes iniciar Picom con el comando `picom &`. Para configurarlo, crea un archivo de configuración en tu directorio personal, por ejemplo `~/.config/picom/picom.conf`, y ajusta la configuración según tus necesidades.

### Nitrogen

**Nitrogen** es una utilidad para cambiar el fondo de escritorio en los sistemas X Window. Para instalarlo, ejecuta el siguiente comando:

    $ sudo pacman -S nitrogen

Después de la instalación, puedes ejecutar `nitrogen /ruta/a/tus/imagenes/` para seleccionar una imagen como fondo de escritorio.

*- **Importante**: Si quieres que estos programas se ejecuten cuando inicies tu computadora, puedes agregar la siguiente configuración a tu archivo .bspwmrc: `nitrogen --restore % & picom --config ~/.config/picom/picom.conf &`.*