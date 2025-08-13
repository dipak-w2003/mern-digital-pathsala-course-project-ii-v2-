
# Prevent multiple sourcing
[[ -n "$__COLORS_LOADED__" ]] && return
readonly __COLORS_LOADED__=true

# ---------- RESET ----------
# Formats Text formattings so we can use different one to be applied
readonly reset="\e[0m"

# ---------- BLACK & WHITE ----------
readonly black="\e[38;5;0m"
readonly white="\e[38;5;15m"
readonly off_white="\e[38;5;255m"

# ---------- RED ----------
readonly light_red="\e[38;5;210m"
readonly soft_red="\e[38;5;217m"
readonly deep_red="\e[38;5;124m"
readonly red="\e[38;5;196m"

# ---------- GREEN ----------
readonly green="\e[38;5;46m"
readonly light_green="\e[38;5;120m"
readonly mint_green="\e[38;5;121m"
readonly deep_green="\e[38;5;28m"
readonly neon_green="\e[38;5;154m"

# ---------- BLUE ----------
readonly blue="\e[38;5;33m"
readonly sky_blue="\e[38;5;117m"
readonly light_blue="\e[38;5;111m"
readonly deep_blue="\e[38;5;19m"
readonly neon_blue="\e[38;5;63m"

# ---------- CYAN ----------
readonly cyan="\e[38;5;51m"
readonly light_cyan="\e[38;5;123m"
readonly aqua="\e[38;5;87m"
readonly teal="\e[38;5;30m"
readonly neon_cyan="\e[38;5;159m"

# ---------- PURPLE ----------
readonly purple="\e[38;5;129m"
readonly light_purple="\e[38;5;183m"
readonly violet="\e[38;5;177m"
readonly deep_purple="\e[38;5;91m"
readonly neon_purple="\e[38;5;135m"

# ---------- PINK ----------
readonly pink="\e[38;5;205m"
readonly hot_pink="\e[38;5;198m"
readonly light_pink="\e[38;5;224m"
readonly rose="\e[38;5;211m"
readonly neon_pink="\e[38;5;213m"

# ---------- ORANGE ----------
readonly orange="\e[38;5;208m"
readonly light_orange="\e[38;5;215m"
readonly coral="\e[38;5;203m"
readonly burnt_orange="\e[38;5;166m"

# ---------- YELLOW ----------
readonly yellow="\e[38;5;226m"
readonly amber="\e[38;5;220m"
readonly light_yellow="\e[38;5;229m"
readonly gold="\e[38;5;142m"
readonly neon_yellow="\e[38;5;190m"

# ---------- GRAY ----------
readonly gray="\e[38;5;246m"
readonly light_gray="\e[38;5;250m"
readonly dark_gray="\e[38;5;238m"
readonly charcoal="\e[38;5;235m"
