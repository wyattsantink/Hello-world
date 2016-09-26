function trackPageView(location){
  if(window.ga){
    if(location === '/'){
      window.ga.trackView('Home');
      return;  
    }
    
    if(location === '/Users/login'){
      window.ga.trackView('Login');
      return;    
    }
    
    // '/Users/login/:msg'
    if(location.substring(0,13) === '/Users/login/'){
      window.ga.trackView('Login');
      return;    
    }
  
    if(location === '/Users'){
      window.ga.trackView('/Users');
      return;    
    }
  
    if(location === '/Users/menu'){
      window.ga.trackView('Menu');
      return;    
    }
  
    if(location === '/Parties'){
      window.ga.trackView('Party Index');
      return;    
    }
  
    // '/Parties/show/:id'
    if(location.substring(0,14) === '/Parties/show/'){
      window.ga.trackView('Party Show');
      return;    
    }
  
    // '/Parties/history/:isActive'
    if(location.substring(0,17) === '/Parties/history/'){
      if(location.substring(17) === 'true'){
        window.ga.trackView('Party Scheduled');
      }else{
        window.ga.trackView('Party History');
      }
      return;    
    }
  
    // '/Parties/dashboard/:id'
    if(location.substring(0,19) === '/Parties/dashboard/'){
      window.ga.trackView('Party Dashboard');
      return;    
    }
  
    // '/Parties/edit/:id'
    if(location.substring(0,14) === '/Parties/edit/'){
      window.ga.trackView('Party Edit');
      return;    
    }
  
    if(location === '/Parties/new'){
      window.ga.trackView('Party New');
      return;    
    }
  
    if(location === '/Parties/filter'){
      window.ga.trackView('Party Filter');
      return;    
    }
  
    if(location === '/Parties/search'){
      window.ga.trackView('Party Search');
      return;    
    }
  
    // '/Parties/search/:query'
    if(location.substring(0,16) === '/Parties/search/'){
      window.ga.trackView('Party Search');
      return;    
    }else{
      window.ga.trackView('404');
      return;    
    }
  }

}