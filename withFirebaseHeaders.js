const { withDangerousMod } = require('@expo/config-plugins');
const fs = require('fs');
const path = require('path');

const withFirebaseHeaders = (config) => {
  return withDangerousMod(config, [
    'ios',
    async (config) => {
      const file = path.join(config.modRequest.platformProjectRoot, 'Podfile');
      let contents = fs.readFileSync(file, 'utf8');
      
      const patch = `
  pre_install do |installer|
    installer.pod_targets.each do |pod|
      if pod.name.start_with?('RNFB')
        def pod.build_type
          Pod::BuildType.static_library
        end
      end
    end
  end
`;
      
      if (!contents.includes('def pod.build_type')) {
        contents = contents.replace(
          /post_install do \|installer\|/,
          `${patch}\n  post_install do |installer|`
        );
        
        // Remove the old post_install patch if it exists
        contents = contents.replace(/  installer\.pods_project\.targets\.each do \|target\|[\s\S]*?config\.build_settings\['DEFINES_MODULE'\] = 'YES'\n      end\n    end\n  end\n/g, '');
        
        fs.writeFileSync(file, contents);
      }
      return config;
    },
  ]);
};

module.exports = withFirebaseHeaders;
