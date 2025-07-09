declare module "*.glb" {
  const uri: number; // This will be resolved to a module ID by Metro bundler
  export default uri;
}
