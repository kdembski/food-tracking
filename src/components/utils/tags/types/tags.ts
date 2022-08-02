export interface TagSettings {
  name: string;
  lightColor?: string;
  darkColor?: string;
}

export interface Tag extends TagSettings {
  count?: number;
}
