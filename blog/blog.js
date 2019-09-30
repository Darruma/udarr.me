module.exports = [
    {
        "title": "Arch Install Notes",
        "body": `# Before Installation
        - Download Arch Linux ISO from [the arch linux website](https://www.archlinux.org/download/)
        - Download [https://rufus.ie/](Rufus) to create bootable usb
        - Disable Secure Boot
        
        # After booting from usb 
        - Connect to wifi with wifi-menu
            - wifi-menu
        - Update system clock with 
            - timedatectl set-tnp true
        
        ## Disk partitioning
        - Create default root partition and mount it at /mnt
            - fdisk 
        - Create EFI partition (if it doesn't already exist) and mount it at /mnt/efi
        - Create swap space and mark as swap
        - Mount root partition at /mnt
            - mount $(root partition) /mnt
        - Create /mnt/boot 
            - mkdir /mnt/boot
        - Mount efi partition at /mnt/boot
            - mount $(efi) /mnt/boot
        
        ## Install
        - pacstrap /mnt base base-devel vim NetworkManager
        
        ## Configure system
        - Generate fstab file for disks
            - genfstab -U /mnt >> /mnt/etc/fstab
        - Chroot into system
            - arch-chroot /mnt
        - Set time zone
            - ln -sf /usr/share/zoneinfo/Region/City /etc/localtime
            - hwclock systohc
        - Localisation
            - Uncomment en_GB.UT8 in /etc/locale.gen
            - Run locale-gen
            - Add LANG=en_US.UTF-8 to /etc/locale.conf
            - Change /etc/hostname to hostname
        
        #Bootloader
        - Install refind-efi
        - Run refind-install`
    }
]