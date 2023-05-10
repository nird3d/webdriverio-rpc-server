export class Settings {
    //******** Paths
    public static downloadsFolder = "C:/Users/User/Downloads/";
    public static movedToFolder = "C:/tmp-auto/";
    public static referenceFolder = "./test/reference/documents/";
    public static precisionTestReport = "c:/tmp/precision-test-tesult.txt";
  
    //******** Users and passwords
    public static authUser = "lilstav";
    public static authPassword = "gillil";
    public static loginUser = "auto_setups@3doptix.com";
    public static loginPassword = "Auto_setups@3doptix.com";
  
    //******** Environments
    public static stagingSiteURL = "https://staging.3doptix.com";
    public static stagingLoginURL =
      "https://staging-login.3doptix.com/login?client_id=5jl61rae5a10prv21t9fbtf58c&response_type=code&scope=email+openid+phone&redirect_uri=https://staging.3doptix.com/on_login.html?link=simulation";
    public static devSiteURL = "https://dev.3doptix.com";
    public static devLoginURL =
      "https://3doptis-dev-new-user-pool.auth.us-east-1.amazoncognito.com/login?client_id=227ka56unod2vd5ne0psn32piu&response_type=code&scope=email+openid+phone&redirect_uri=https://dev.3doptix.com/on_login.html?link=simulation";
  
    //******** Image file names
    public static incoherentIrradianceFile = "Spot (Incoherent Irradiance)";
    public static coherentIrradianceFile = "Spot (Coherent Irradiance)";
    public static coherentPhaseFile = "Coherent Phase";
  
    //******** Analysis type
    public static incoherentIrradianceType = "SpotII";
    public static coherentIrradianceType = "SpotCI";
    public static coherentPhaseType = "SpotCP";
  }
  