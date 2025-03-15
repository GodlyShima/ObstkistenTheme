<?php declare(strict_types=1);

namespace ObstkistenOnlineTheme;

use Shopware\Core\Framework\Plugin;
use Shopware\Storefront\Framework\ThemeInterface;

class ObstkistenOnlineTheme extends Plugin implements ThemeInterface
{
	public function getThemeConfigPath(): string
    {
        return 'theme.json';
    }
}