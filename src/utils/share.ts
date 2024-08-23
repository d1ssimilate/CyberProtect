import { useLocation, useNavigate } from "@tanstack/react-router"

type SocialMedia = 'vk'|'telegram'|'whatsapp';

export const share = (socialMedia: SocialMedia, text: string) => {    
    const { pathname } = useLocation();    

    const navigate = useNavigate({from: '/'});

    const socialMedias = {
        vk: () => navigate({to: `https://vk.com/share.php?url=${pathname}`}),

        telegram: () => navigate({to: `https://telegram.me/share/url?url=${pathname}&text=${text}/api/`}),

        whatsapp: () => navigate({to: `https://api.whatsapp.com/send?text=${text}/api/`}),
    }

    const navigateToSocialMedia = socialMedias[socialMedia];

    navigateToSocialMedia();
}